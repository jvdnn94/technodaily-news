import { useContext } from "react"
import { NewsContext } from "../../../context/NewsContext"

export const AdminUserComponents=()=>{
    const{users,handleChangeRole,rolesList,handleDeleteUser}=useContext(NewsContext)
    return(
        <>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">مدیریت کاربران</h2>
                  {users.length === 0 ? (
                    <p>هیچ کاربری یافت نشد.</p>
                  ) : (
                    <div className="bg-blue-950 p-4 rounded-2xl shadow space-y-4 mt-8">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 text-right">
                          <thead>
                            <tr className="bg-gray-100 text-gray-700">
                              <th className="px-4 py-2 border">#</th>
                              <th className="px-4 py-2 border">نام کاربری</th>
                              <th className="px-4 py-2 border">ایمیل</th>
                              <th className="px-4 py-2 border">نقش</th>
                              <th className="px-4 py-2 border">عملیات</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-950">
                            {users.map((user, index) => (
                              <tr key={user.id} className="border-b">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{user.username}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border capitalize">{user.roles?.[0] || "مشخص نیست"}</td>
                                <td className="px-4 py-2 border">
                                  <select
                                    className="px-2 py-1 border rounded"
                                    value={user.roles?.[0] || ""}
                                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                                  >
                                    {rolesList.map((role) => (
                                      <option key={role.value} value={role.value}>
                                        {role.label}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                  >
                                    حذف
                                  </button>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  )}
        </>
    )
}