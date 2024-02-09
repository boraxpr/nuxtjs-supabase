export const formatCurrency = (value) => {
if (value !== null) {
return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
};
