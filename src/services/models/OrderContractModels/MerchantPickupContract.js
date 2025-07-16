import { DataX } from "@lihzsky/data-x"

export class MerchantPickupContract extends DataX {
	rentFrom  = {
		type: Object,
	}

	rentalAgreement = {
		type: String,
	}

	signatureUrl = {
		type: String,
	}

	specialItem  = {
		type: String,
	}

	vehicleForm  = {
		type: Object,
	}
}