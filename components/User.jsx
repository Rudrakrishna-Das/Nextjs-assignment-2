"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import UserDetails from "./UserDetails";

const URL = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

const formatName = (firstName, lastName) => {
  const formattedFirstName =
    firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName =
    lastName.slice(0, 1).toUpperCase() + lastName.slice(1).toLowerCase();
  return formattedFirstName + " " + formattedLastName;
};
const formatDateTime = (dateTime) => {
  const date = dateTime.split("T")[0].split("-").reverse().join("/");
  let time = dateTime.split("T")[1].split(":");
  let anteMeridiem = " AM";
  time.pop();
  if (+time[0] > 12) {
    time[0] = +time[0] - 12;
    time[0] = time[0].toString();
    anteMeridiem = " PM";
  }
  time = time.join(":") + anteMeridiem;
  return { date, time };
};

const formatUser = (userObject) => {
  const user = {};
  user["creationTime"] = formatDateTime(userObject.createdAt);
  user["email"] = userObject.profile.email;
  user["userName"] = userObject.profile.username;
  user["bio"] = userObject.Bio;
  return user;
};

const User = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectUser, setSelectedUser] = useState(false);
  const [imageError, setImageError] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          setLoading(false);
          throw new Error("No data to show");
        }
        const data = await res.json();
        setLoading(false);
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error || userData.length === 0) {
    return <p className="text-3xl text-red-600 text-center mt-32">{error}</p>;
  }

  return (
    <section className="w-[60%] mx-auto my-6 max-sm:w-[95%]">
      <h1 className="text-center text-2xl font-extrabold">USER LIST</h1>
      <div>
        {userData.map((user) => (
          <div
            className={`border-[1px] border-black p-4 `}
            key={user.profile.username}
          >
            <div
              onClick={() =>
                setSelectedUser((prevState) =>
                  !prevState
                    ? formatUser(user)
                    : prevState.userName !== user.profile.username
                    ? formatUser(user)
                    : false
                )
              }
              className={`hover:border-[1px] hover:border-black flex justify-between gap-5 p-2 cursor-pointer overflow-x-auto max-lg:flex-col ${
                selectUser?.userName === user.profile.username
                  ? "border-[1px] border-black"
                  : ""
              }`}
            >
              <div className="flex gap-5">
                <div>
                  <Image
                    src={
                      imageError[user.profile.username]
                        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        : user.avatar
                    }
                    alt={user.profile.username}
                    height={100}
                    width={100}
                    className="rounded-full object-cover max-sm:w-10 max-sm:h-10"
                    onError={() =>
                      setImageError({
                        ...imageError,
                        [user.profile.username]: true,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl font-bold max-sm:text-lg">
                      {formatName(
                        user.profile.firstName,
                        user.profile.lastName
                      )}
                    </h1>
                    <p className="text-sm text-slate-400">{user.jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      {selectUser.userName === user.profile.username
                        ? ""
                        : "Other infos..."}
                    </p>
                  </div>
                </div>
              </div>
              {selectUser?.userName === user.profile.username && (
                <UserDetails user={formatUser(user)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default User;
