import Sidebar from "@/components/Sidebar";
import FormUser from "@/components/form/FormUser";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(
    "http://localhost:3000/api/users/" + ctx.query.id
  );
  return { props: { data } };
}

const formUpdateUsers = ({ data }) => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <FormUser data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default formUpdateUsers;

formUpdateUsers.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
