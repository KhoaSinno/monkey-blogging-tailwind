import DashboardHeading from "Module/dashboard/DashboardHeading";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { categoryStatus } from "utils/constants";

const ITEMS_PER_PAGE = 5
const CategoryManage = () => {
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [lastDoc, setLastDoc] = useState();
  const [totalCategory, setTotalCategory] = useState(0);

  // side effect
  useEffect(() => {
    const getPost = async () => {
      const categoriesCol = collection(db, "categories");
      const q1 = query(categoriesCol,
        where("name", ">=", filter.toLowerCase()),
        where("name", "<=", filter.toLowerCase() + "\uf8ff"));
      const q2 = query(categoriesCol, limit(ITEMS_PER_PAGE))
      const colRef = filter ? q1 : q2

      const documentSnapshots = await getDocs(colRef);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible)

      onSnapshot(colRef, (querySnapshot) => {
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categories);
      });
    }
    getPost()
      .catch(console.error);
  }, [filter]);

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (querySnapshot) => {
      setTotalCategory(querySnapshot.size)
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
    if (categories.length >= totalCategory) return

    const next = query(collection(db, "categories"),
      startAfter(lastDoc),
      limit(ITEMS_PER_PAGE));

    onSnapshot(next, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategories([...categories, ...result]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible)
  }

  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      >
        <Button to='/manage/add-category' classBtn="bg-green-400 transition-all text-white px-4  hover:bg-green-500">Create new category</Button>
      </DashboardHeading>
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
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map((category) =>
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><span className="italic text-gray-400 whitespace-normal">{category.slug}</span></td>
              <td>
                {+category.status === categoryStatus.APPROVED ?
                  <LabelStatus type="success">Approved</LabelStatus>
                  : <LabelStatus type="warning">UNAPPROVED</LabelStatus>
                }
              </td>
              <td className="flex gap-1 items-center justify-center">
                <ActionView></ActionView>
                <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                <ActionDelete onClick={() => handleDelete(category)}></ActionDelete>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {categories.length < totalCategory &&
        <Button onClick={handleLoadMore} classBtn="bg-green-400 transition-all text-white px-4  hover:bg-green-500" classContainer='w-[230px] m-auto mt-5' >Load more...</Button>}
    </div>
  );
};

export default CategoryManage;
