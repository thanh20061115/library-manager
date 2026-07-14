import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

import BookList from '../pages/books/BookList';
import ReaderList from '../pages/readers/ReaderList';
import BorrowRecordList from '../pages/borrow-records/BorrowRecordList';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BookList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/readers"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ReaderList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/borrow-records"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BorrowRecordList />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;