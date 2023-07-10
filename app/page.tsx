"use client"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<{ email: string; isAdmin: boolean } | null>(null);

  // Định nghĩa mutation để thực hiện request đăng nhập
  const { mutate, isLoading, isError } = useMutation<void, Error, { email: string; password: string; isAdmin: boolean }>(
    async (data) => {
      const response = await axios.post("https://localhost:5433/api/Accounts/SignIn", data);
      const accessToken = response.data; // Lưu access token vào biến accessToken
      localStorage.setItem("accessToken", accessToken); // Lưu access token vào localStorage
      return response.data;
      
    },
    {
      onSuccess: (data) => {
        if (loggedInUser) {
          if (loggedInUser.isAdmin) {
            router.push("/admin");
          } else {
            router.push("/member");
          }
        }
      },
    }
  );

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:5433/api/Accounts/SignIn", { email, password });
      const usersResponse = await axios.get("https://localhost:5433/api/Accounts");
      const users = usersResponse.data;
      const loggedInUser = users.find((user: { email: string }) => user.email === email);
      if (loggedInUser) {
        setLoggedInUser({ email: loggedInUser.email, isAdmin: loggedInUser.isAdmin });
      }
      const user = {
        avatar: loggedInUser.avatar,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        phoneNumber: loggedInUser.phoneNumber,
        testAmount: loggedInUser.testAmount,
        dateOfBirth: loggedInUser.dateOfBirth,
        isAdmin: loggedInUser.isAdmin,
        isActive: loggedInUser.isActive,
      };
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
    // Gọi mutate để thực hiện request đăng nhập
    mutate({ email, password, isAdmin });
  };


  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-around">
              <div className="flex items-center">
                <input
                  id="isAdminFalse"
                  name="isAdmin"
                  type="radio"
                  checked={!isAdmin}
                  onChange={() => setIsAdmin(false)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="isAdminFalse" className="ml-3 block text-sm leading-6 text-gray-700">
                  Thành viên
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="isAdminTrue"
                  name="isAdmin"
                  type="radio"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(true)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="isAdminTrue" className="ml-3 block text-sm leading-6 text-gray-700">
                  Admin
                </label>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
          {isError && (
          <p className="text-red-500 mt-4">{loggedInUser && !loggedInUser.isAdmin ? "Bạn chưa được cấp quyền thành viên" : "Tên đăng nhập hoặc mật khẩu không đúng."}</p>
        )}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Picture"
        />
      </div>
    </div>
  );
}
