import { Record } from "immutable"

export type Constructor<T> = new (...values: any) => T

const _ensureRecord = <T>(maybeRecord: any, record: Constructor<T>): T =>
  _isRecord(maybeRecord, record) ? maybeRecord : new record(maybeRecord)

const _isRecord = <T>(maybeRecord: any, record: Constructor<T>): boolean =>
  Record.isRecord(maybeRecord) && maybeRecord instanceof record

const RecordUtils = {
  ensureRecord: _ensureRecord,
  isRecord: _isRecord,
}

export { RecordUtils }
