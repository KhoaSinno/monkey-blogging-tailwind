import DashboardHeading from "Module/dashboard/DashboardHeading";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { categoryStatus } from "utils/constants";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const CategoryManage = () => {
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getPost = async () => {
      const categoriesCol = collection(db, "categories");
      onSnapshot(categoriesCol, (querySnapshot) => {
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categories);
      });
    }
    getPost()
      .catch(console.error);
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

  console.log(categories)
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      >
        <Button to='/manage/add-category' classBtn="bg-green-400 transition-all text-white px-4  hover:bg-green-500">Create new category</Button>
      </DashboardHeading>
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
    </div>
  );
};

export default CategoryManage;
