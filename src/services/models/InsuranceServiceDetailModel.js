import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../utils";

class InsuranceServiceModel extends DataX {
  damageInsuranceAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.damageInsuranceAmount)
  }

  depreciationFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.depreciationFee)
  }

  thirdPartyInsuranceStr = {
    type: String,
    field: (data) => {
      if (Number.isFinite(data.thirdPartyInsurance)) {
        return Math.floor(data.thirdPartyInsurance / 1000000)
      }

      return '0'
    }
  }

  excludeOfDamageInsurance = {
    type: String,
    field: (data) => {
      const content = []

      if (data.glass) {
        content.push('玻璃')
      }

      if (data.tire) {
        content.push('轮胎')
      }

      if (content.length) {
        return '不包含' + content.join('、')
      }

      return '无需用户承担'
    }
  }
}

class BaseSettingModel extends DataX {
  damageInsuranceAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.damageInsuranceAmount)
  }

  depreciationFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.depreciationFee)
  }

  outageFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.outageFee)
  }


}

class ServiceModel extends DataX {
  baseSetting = {
    type: BaseSettingModel
  }

  highestPriceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.highestPrice)
  }

  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }
}

export class InsuranceServiceDetailModel extends DataX {
  baseSetting = {
    type: InsuranceServiceModel
  }

  model = {
    type: ServiceModel
  }

  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }

  statusStr = {
    type: String,
    field: (data) => {
      switch(data.status) {
        case 0:
          return '禁用'
        case 1:
          return '启用'
        case 2:
          return '删除'
        default:
      }

      return ''
    }
  }
}
