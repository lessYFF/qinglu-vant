import { DataX } from "@lihzsky/data-x"
import { Tempo } from "../../../utils"

export class OrderMemberModel extends DataX {
  validCertificateName = {
    type: String,
    field: (data) => {
      if (data.idcardNo) {
        return '身份证'
      }
      
      if (data.driverlicNo) {
        return '驾驶证'
      }

      if (data.passport) {
        return '护照'
      }

      return ''
    }
  }

  validCertificateNo = {
    type: String,
    field: (data) => {
      if (data.idcardNo) {
        return data.idcardNo
      }
      
      if (data.driverlicNo) {
        return data.driverlicNo
      }

      if (data.passport) {
        return data.passport
      }

      return ''
    }
  }

  driverlicIssueDateStr = {
    type: String,
    field: (data) => Tempo.format(data.driverlicIssueDate, 'yyyy.MM.dd')
  }

  driverlicValidBeginStr = {
    type: String,
    field: (data) => Tempo.format(data.driverlicValidBegin, 'yyyy.MM.dd')
  }

  driverlicValidEndStr = {
    type: String,
    field: (data) => Tempo.format(data.driverlicValidEnd, 'yyyy.MM.dd')
  }

  idcardValidBeginStr = {
    type: String,
    field: (data) => Tempo.format(data.idcardValidBegin, 'yyyy.MM.dd')
  }

  idcardValidEndStr = {
    type: String,
    field: (data) => Tempo.format(data.idcardValidEnd, 'yyyy.MM.dd')
  }
}