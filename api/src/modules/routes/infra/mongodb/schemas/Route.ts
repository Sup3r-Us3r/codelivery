import { Schema, model } from 'mongoose';

type Position = {
  latitude: number;
  longitude: number;
}

type Route = {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}

const schema = new Schema<Route>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  startPosition: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  endPosition: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

const RouteModel = model<Route>('Route', schema);

export { RouteModel };
