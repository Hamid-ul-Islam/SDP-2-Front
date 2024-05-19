import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className=" border  w-full rounded p-3 bg-white">
      <h3 className="text-indigo-800 py-2 border-b">People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span
          className="text-indigo-500 flex justify-center mt-2 font-medium cursor-pointer"
          onClick={() => setModalOpened(true)}
        >
          Show more
        </span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
