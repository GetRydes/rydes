import { IPassengerSchema } from "../../../types";

const makeRemoveCustomer = ({ PassengerSchema }: IPassengerSchema) => {
  const removeCustomer = async ({ id }: { id: string }) => {
    if (!id) {
      throw new Error("You must supply a comment id.");
    }

    const commentToDelete = await PassengerSchema.findById({ customerId: id });

    if (!commentToDelete) {
      return deleteNothing();
    }

    return hardDelete({ customerId: id });
  };

  const deleteNothing = () => {
    return {
      deletedCount: 0,
      message: "Customer not found, nothing to delete.",
    };
  };

  const hardDelete = async (customer: any) => {
    await PassengerSchema.remove(customer);
    return {
      deletedCount: 1,
      message: "Customer account has been deleted.",
    };
  };

  return removeCustomer;
};

export default makeRemoveCustomer;
