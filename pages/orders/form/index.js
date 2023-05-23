import Sidebar from "@/components/Sidebar";
import FormOrder from "@/components/form/FormOrder";

const formOrders = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <FormOrder />
          </div>
        </div>
      </div>
    </>
  );
};

export default formOrders;

formOrders.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
