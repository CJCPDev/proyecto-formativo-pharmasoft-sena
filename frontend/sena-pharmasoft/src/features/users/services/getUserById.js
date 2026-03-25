import { users } from "@/data/users/users.js"

export const getSupplierById = (value) => {
    return users.find(users => users.value == value);
}