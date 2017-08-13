import * as settings from 'settings';
import * as mongoose from 'mongoose';

let connection;

export function collectGarbage(_db) {
  const db = (_db as any);

  if (db.models) {
    Object.keys(db.models).forEach(key => delete db.models[key]);
  }

  if (db.collections && db.collections) {
    Object.keys(db.collections).forEach(key => delete db.collections[key]);
  }

  if (db.base && db.base.modelSchemas && db.base.modelSchemas) {
    Object.keys(db.base.modelSchemas).forEach(
      key => delete db.base.modelSchemas[key]
    );
  }
}


export function connectMongoose() {
  if (!connection) {
    connection = mongoose.connect(settings.MONGO_URI, { useMongoClient: true });
  }

  return connection;
}
