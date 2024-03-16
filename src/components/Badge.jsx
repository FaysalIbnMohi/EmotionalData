export default function Badge({ value, status }) {
  return (
    <>
      {/*<!-- Component: Rounded basic base sized badge --> */}
      <span className={`inline-flex items-center justify-center gap-1 rounded-full ${status === "Active" ? 'bg-greenBg' : 'bg-red-500'} px-2.5 py-1 text-sm text-white`}>
        {value}<span className="sr-only"></span>
      </span >
      {/*<!-- End Rounded basic base sized badge --> */}
    </>
  );
}