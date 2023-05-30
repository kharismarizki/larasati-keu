import Sidebar from "@/components/Sidebar";
import FormOrder from "@/components/form/FormOrder";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(
    "http://localhost:3000/api/customers/" + ctx.query.id
  );
  return { props: { data } };
}

const formUpdateCust = ({ data }) => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <FormOrder data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default formUpdateCust;

formUpdateCust.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
