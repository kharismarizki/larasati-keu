import Sidebar from "@/components/Sidebar";
import FormUser from "@/components/form/FormUser";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

const formUsers = () => {
  const router = useRouter();

  async function checkRole() {
    try {
      const session = await getSession();
      if (!session) throw new Error(session);
      if (session.user.role === "penyiar") {
        toast.error("Unauthorized", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        return router.replace("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    checkRole();
  }, []);
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <FormUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default formUsers;

formUsers.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
