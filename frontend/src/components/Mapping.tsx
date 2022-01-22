import {
  useState,
  useRef,
  useEffect,
  useCallback,
  FormEvent,
} from 'react';
import Script from 'next/script';
import { Grid, Select, MenuItem, Button, makeStyles } from '@material-ui/core';
import io, { Socket } from 'socket.io-client';
import { sample, shuffle } from 'lodash';
import { useSnackbar } from 'notistack';

import { Navbar } from './Navbar';
import { getCurrentPosition } from '../utils/geolocation';
import { makeCarIcon, makeMakerIcon, Map } from '../utils/map';
import { RouteExistsError } from '../errors/routeExistsError';

interface Position {
  latitude: number;
  longitude: number;
}
interface Route {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}

interface PositionResponse {
  routeId: string;
  clientId: string;
  position: {
    latitude: number;
    longitude: number;
  };
  finished: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_MAPS_SOURCE_API = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;

const colors = [
  "#b71c1c",
  "#4a148c",
  "#2e7d32",
  "#e65100",
  "#2962ff",
  "#c2185b",
  "#FFCD00",
  "#3e2723",
  "#03a9f4",
  "#827717",
];

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
  },
  form: {
    margin: '16px',
  },
  btnSubmitWrapper: {
    textAlign: 'center',
    marginTop: '10px',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export const Mapping = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeIdSelected, setRouteIdSelected] = useState<string>('');
  const mapRef = useRef<Map>();
  const socketIORef = useRef<Socket>();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const startRoute = useCallback((event: FormEvent) => {
    event.preventDefault();

    const route = routes.find(route => route._id === routeIdSelected);
    const color = sample(shuffle(colors));

    try {
      mapRef.current?.addRoute(routeIdSelected, {
        currentMarkerOptions: {
          position: {
            lat: route?.startPosition.latitude,
            lng: route?.startPosition.longitude,
          },
          icon: makeCarIcon(color),
        },
        endMarkerOptions: {
          position: {
            lat: route?.endPosition.latitude,
            lng: route?.endPosition.longitude,
          },
          icon: makeMakerIcon(color),
        },
      });

      socketIORef.current?.emit('route.new-direction', {
        routeId: routeIdSelected,
        clientId: socketIORef.current.id,
      });
    } catch (error) {
      if (error instanceof RouteExistsError) {
        enqueueSnackbar(`${route?.title} já adicionado, espere finalizar`, {
          variant: 'error',
        });

        return;
      }

      throw error;
    }
  }, [routeIdSelected, routes, enqueueSnackbar]);

  const finishRoute = useCallback((route: Route) => {
    enqueueSnackbar(`${route.title} finalizou`, {
      variant: 'success',
    });

    mapRef.current?.removeRoute(route._id);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!socketIORef.current?.connected) {
      socketIORef.current = io(API_URL).connect();

      socketIORef.current?.on('connect', () => {
        console.log(`Socket ${socketIORef.current?.id} connected`);
      });
    }

    const handler = (positionResponse: PositionResponse) => {
      console.log(positionResponse);

      mapRef.current?.moveCurrentMarker(positionResponse.routeId, {
        lat: positionResponse.position.latitude,
        lng: positionResponse.position.longitude,
      });

      if (positionResponse.finished) {
        const route = routes
          .find(route => route._id === positionResponse.routeId);

        finishRoute(route);
      }
    };

    socketIORef.current?.on('route.new-position', handler);

    return () => {
      socketIORef.current?.off('route.new-position', handler);
    }
  }, [finishRoute, routes]);

  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition({ enableHighAccuracy: true });

      const myMapDiv = document.querySelector('#map') as HTMLElement;

      mapRef.current = new Map(myMapDiv, {
        zoom: 15,
        center: {
          lat: position.latitude,
          lng: position.longitude,
        },
      });
    })();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then(response => response.json())
      .then(data => setRoutes(data));
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src={GOOGLE_MAPS_SOURCE_API}
        strategy="beforeInteractive"
      />

      <Grid container className={classes.root}>
        <Grid item xs={12} sm={3}>
          <Navbar />

          <form onSubmit={startRoute} className={classes.form}>
            <Select
              fullWidth
              displayEmpty
              value={routeIdSelected}
              onChange={event => setRouteIdSelected(event.target.value as string)}
            >
              <MenuItem value="">
                <em>Selecione uma corrida</em>
              </MenuItem>

              {
                routes.map(route => (
                  <MenuItem key={route._id} value={route._id}>
                    {route.title}
                  </MenuItem>
                ))
              }
            </Select>

            <div className={classes.btnSubmitWrapper}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Iniciar uma corrida
              </Button>
            </div>
          </form>
        </Grid>

        <Grid item xs={12} sm={9}>
          <div id="map" className={classes.map} />
        </Grid>
      </Grid>
    </>
  );
};
