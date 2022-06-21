export default function parseErrorMessage(err: any) {
  return err?.response?.data?.errors?.[0].message || err?.message || "Opps something went wrong.";
}
