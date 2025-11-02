"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Pencil, Trash2, Plus } from "lucide-react"
import { CreateAddressDialog } from "./dialogs/create-address-dialog"
import { UpdateAddressDialog } from "./dialogs/update-address-dialog"
import { Address } from "@/lib/type"
import { DeleteAddressDialog } from "./dialogs/delete-address-dialog"


interface AddressBookTabProps {
  addresses: Address[]
  userName: string;
}

export function AddressBookTab({ addresses, userName }: AddressBookTabProps) {

  console.log("Addresses ==> ", addresses)
  return (
    <div className="space-y-6">

      <CreateAddressDialog addresses={addresses} >
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Address
        </Button>
      </CreateAddressDialog>



      <div className="border-t border-gray-200" />

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No addresses saved yet</p>
        ) : (
          addresses.map((address: Address) => (
            <div
              key={address._id}
              className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="absolute top-4 right-4 flex gap-2">

                <UpdateAddressDialog address={address} addresses={addresses}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-white cursor-pointer">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </UpdateAddressDialog>
                <DeleteAddressDialog address={address} addresses={addresses}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-white cursor-pointer hover:bg-red-400!">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteAddressDialog>
              </div>

              <div className="space-y-1 pr-16">
                <h3 className="font-semibold text-lg text-black">{userName}</h3>
                <p className="text-gray-400 font-normal">{address.address_line_1}</p>
                <p className="text-gray-400 font-normal">
                  {address.city}, {address.state}, {address.pincode}
                </p>
                <p className="text-gray-400 font-normal">INDIA</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
