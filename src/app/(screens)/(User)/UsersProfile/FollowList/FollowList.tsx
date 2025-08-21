"use client";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useHelper from "../../../../../../Helper/helper";

interface Records {
  UserName: string;
  UserId: number;
  UserProfilePic: string;
  CanSeeMyFollowers: boolean;
}

type PageProps = {
  FollowType: "followers" | "following";
  userId: number;
  Name?: string;
  refreshTrigger?: string;
};

const page = ({ FollowType, userId, Name, refreshTrigger }: PageProps) => {
  const router = useRouter();
  const helper = useHelper();
  const [users, setUsers] = useState<Records[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [canSeeMyFollowers, setCanSeeMyFollowers] = useState<boolean>(true);
  const postsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    const endpoint =
      FollowType === "following"
        ? "/Follow/GetFollowing"
        : "/Follow/GetFollowers";

    helper.xhr
      .Get(
        endpoint,
        helper
          .GetURLParamString({
            id: userId,
          })
          .toString()
      )
      .then((res) => {
        console.log(res);
        const userList = FollowType === "following" ? res : res.data;
        setCanSeeMyFollowers(res?.AllowToSeeFollowers);
        setUsers(userList);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(users.length / postsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {canSeeMyFollowers === false && FollowType === "followers" ? (
            <div className="text-center text-gray-600 mt-10">
              Only {Name} can see it's followers
            </div>
          ) : (
            <>
              <div>
                {currentPosts.length > 0 ? (
                  <div className="space-y-6 bg-[#f8f8f8]">
                    {currentPosts.map((item: Records) => (
                      <div
                        key={item.UserId}
                        className="flex items-center gap-6 border-b pb-4 transition-all duration-200 px-4 py-2 rounded-md"
                      >
                        {item?.UserProfilePic ? (
                          <img
                            src={`${helper.GetUrl()}/${item?.UserProfilePic}`}
                            className="w-10 h-10 object-cover rounded-full shadow-sm"
                            alt=""
                          />
                        ) : (
                          <FaUser />
                        )}
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-200 cursor-pointer">
                            {item.UserName}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-600 mt-10">
                    {currentPosts.length === 0
                      ? `No ${FollowType}`
                      : `No ${FollowType}`}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {users.length > postsPerPage && (
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstPost + 1} -{" "}
                    {Math.min(indexOfLastPost, users.length)} of {users.length}{" "}
                    users
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
                    >
                      <FaArrowLeft />
                    </button>
                    <span className="text-sm font-semibold">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default page;
