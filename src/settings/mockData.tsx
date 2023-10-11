export const mockSelect = {
  shop: [
    { value: "shop_1", label: "Магазин 1" },
    { value: "shop_2", label: "Магазин 2" },
    { value: "shop_3", label: "Магазин 3" },
    { value: "shop_4", label: "Магазин 4" },
  ],
  department: [
    { value: "department_1", label: "Отдел 1" },
    { value: "department_2", label: "Отдел 2" },
    { value: "department_3", label: "Отдел 3" },
    { value: "department_4", label: "Отдел 4" },
  ],
};

export const statusesSettings = [
  { label: "Новая", value: "new", disabled: true },
  { label: "Примерка", value: "fitting", disabled: false },
  { label: "На оформлении", value: "registration", disabled: false },
  { label: "Принимает решение", value: "solution", disabled: false },
  { label: "Потенциал", value: "potencial", disabled: false },
  { label: "Cопровождение", value: "support", disabled: false },
  { label: "Продано", value: "sell", disabled: true },
  { label: "Отказ", value: "refuse", disabled: true },
];

export const defaultCheckedList = ["new", "sell", "refuse"];
