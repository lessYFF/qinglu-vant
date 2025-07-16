import { DataX } from '@lihzsky/data-x';
import { Tempo } from '../../utils';

export class UserCertificateModel extends DataX {
  idcardValidBeginTimestamp = {
    type: Number,
    field: (data) => Tempo.toTimestamp(data.idcardValidBegin)
  }

  idcardValidEndTimestamp = {
    type: Number,
    field: (data) => Tempo.toTimestamp(data.idcardValidEnd)
  }

  driverlicIssueDateTimestamp = {
    type: Number,
    field: (data) => Tempo.toTimestamp(data.driverlicIssueDate)
  }

  driverlicValidBeginTimestamp = {
    type: Number,
    field: (data) => Tempo.toTimestamp(data.driverlicValidBegin)
  }

  driverlicValidEndTimestamp = {
    type: Number,
    field: (data) => Tempo.toTimestamp(data.driverlicValidEnd)
  }
}
