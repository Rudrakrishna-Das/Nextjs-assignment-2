const UserDetails = ({ user }) => {
  console.log(user);
  return (
    <section className="max-sm:text-sm flex flex-col gap-5 text-lg w-[45%] max-lg:w-full">
      <p>
        Joined from <span className="font-bold">{user.creationTime.date} </span>
        at
        <span className="font-bold"> {user.creationTime.time}</span>
      </p>
      <p className="font-bold">
        Username:-{" "}
        <span className="font-normal  text-slate-600">{user.userName}</span>
      </p>
      <p className="font-bold">
        Email:-{" "}
        <span className="font-normal  text-slate-600">{user.email}</span>
      </p>
      <p className="font-bold">
        Bio:- <span className="font-normal  text-slate-600">{user.bio}</span>
      </p>
    </section>
  );
};

export default UserDetails;
