import DashboardHeading from "Module/dashboard/DashboardHeading";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { userRole, userStatus } from "utils/constants";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const ITEMS_PER_PAGE = 5
const UserManage = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [lastDoc, setLastDoc] = useState();
  const [totalUser, setTotalUser] = useState(0);

  // side effect
  useEffect(() => {
    const getPost = async () => {
      const usersCol = collection(db, "users");
      const q1 = query(usersCol,
        where("name", ">=", filter.toLowerCase()),
        where("name", "<=", filter.toLowerCase() + "\uf8ff"));
      const q2 = query(usersCol, limit(ITEMS_PER_PAGE))
      const colRef = filter ? q1 : q2

      const documentSnapshots = await getDocs(colRef);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible)

      onSnapshot(colRef, (querySnapshot) => {
        const result = [];
        querySnapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setUsers(result);
      });
    }
    getPost()
      .catch(console.error);
  }, [filter]);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (querySnapshot) => {
      setTotalUser(querySnapshot.size)
    });
  }, []);
  // side method
  const handleDelete = async (category) => {
    try {
      const docRef = doc(db, 'categories', category.id);
      Swal.fire({
        title: `Delete "${category.name}". Are you sure ? `,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          Swal.fire({
            title: "Deleted!",
            text: `Delete success category: ${category.name}.`,
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  const handleOnchangeFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 300)

  const handleLoadMore = async () => {
    if (users.length >= totalUser) return

    const next = query(collection(db, "users"),
      startAfter(lastDoc),
      limit(ITEMS_PER_PAGE));

    onSnapshot(next, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...users, ...result]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible)
  }

  console.log(users)
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <input type="text"
        name="search"
        className="p-2 border border-gray-400 rounded-lg"
        placeholder="Search..."
        onChange={handleOnchangeFilter}
      />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map((user) =>
            <tr key={user.id}>
              <td title={user.id}>{user.id.slice(0, 8) + '...'}</td>
              <td className="whitespace-nowrap">
                <div className="flex items-center justify-center ml-0 gap-3">
                  <img src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="avatar" className="w-10 h-10 rounded-lg flex-shrink-0 object-cover" />
                  <div className="flex-1 text-start">
                    <h3>{user?.fullname}</h3>
                    <time className="italic text-gray-400 whitespace-normal">{new Date().toLocaleDateString()}</time>
                    {/* <time>{new Date(user?.createAt?.seconds * 1000 + user?.createAt?.nanoseconds / 1000000)}</time> */}
                  </div>
                </div>
              </td>
              <td><span className="">{user?.username}</span></td>
              <td>{user?.email}</td>
              <td>
                <UserStatus>{+user?.status}</UserStatus>
              </td>
              <UserMode>{+user.role}</UserMode>
              <td className="flex gap-1 items-center justify-center">
                <ActionView></ActionView>
                <ActionEdit onClick={() => navigate(`/manage/update-user?id=${user.id}`)}></ActionEdit>
                <ActionDelete onClick={() => handleDelete(user)}></ActionDelete>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {users.length < totalUser &&
        <Button onClick={handleLoadMore} classBtn="bg-green-400 transition-all text-white px-4  hover:bg-green-500" classContainer='w-[230px] m-auto mt-5' >Load more...</Button>}
    </div>
  );
};

const UserStatus = ({ children }) => {
  if (!children) return
  let title = ''
  let type = ''
  switch (children) {
    case userStatus.ACTIVE:
      title = 'ACTIVE'
      type = 'success'
      break;
    case userStatus.PENDING:
      title = 'PENDING'
      type = 'warning'
      break;
    case userStatus.BAN:
      title = 'BAN'
      type = 'danger'
      break;
    default:
      title = 'UNKNOWN'
      type = 'default'
      console.warn('User none status!');
  }
  return <LabelStatus type={type}>{title}</LabelStatus>
}

const UserMode = ({ children }) => {
  let title = ''
  switch (children) {
    case userRole.ADMIN:
      title = 'ADMIN'
      break;
    case userRole.MOD:
      title = 'MOD'
      break;
    case userRole.USER:
      title = 'USER'
      break;
    default:
      title = ''
      break;
  }
  return <td className="font-semibold">{title}</td>
}

export default UserManage;
