import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ScrollButton, PrivateRoute, AdminRoute, StaffRoute, TrainerRoute } from "./components";
import {
  Register, Login, UserListStaff, ForgotPassword, Home, PlanSubscription, UpdatePlanStaff, Error, Profile,
  UserDashBoard, PlanDetail, AdminDashBoard, StaffDashBoard, CreatePlan, UpdatePlan, Plans, PlansStaff,
  SubscriberList, UserList, FavouriteExercises, PlanDetails, PlanFullDetail, ContactUs, TrainerDetails,
  Feedback, Feedbacks, FeedbackList, Payment, TrainerDashBoard, SessionsList, SubscriptionList,
  MemberList, SessionsListTrainer,TrainingSession
} from "./pages";
import TrainerList from "./pages/Admin/TrainerList";
import GymroomList from "./pages/Admin/GymroomList";
import RegisterTrainingSession from './pages/User/RegisterTrainingSession';
import Equipment from './pages/Admin/Equipment';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/auth";

const App = () => {
  const { auth, setAuth } = useAuth();


  return (
    <BrowserRouter>
      <ScrollButton />
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/plan-subscribe/:planid' element={<PlanSubscription/>} />
        <Route path='/plan-detail/:planid' element={<PlanDetails/>} />
        <Route path='/trainer/:trainerId' element={<TrainerDetails/>} />
        <Route path='/feedback' element={<Feedback/>} />

        <Route path='*' element={<Error />} />

        {/* user routes =========================== */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<UserDashBoard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/plan-detail' element={<PlanDetail />} />
          <Route path='user/plan-detail-full/:planid' element={<PlanFullDetail/>} />
          <Route path='user/favourite-exercises' element={<FavouriteExercises/>} />
          <Route path='user/feedbacks' element={<Feedbacks/>} />
          <Route path='user/payment' element={<Payment/>} />
           <Route path='user/training-sessions' element={<TrainingSession/>} />
          <Route path='user/register-training' element={<RegisterTrainingSession />} />
        </Route>


        {/* admin routes ================================== */}

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashBoard />} />
          <Route path='admin/profile' element={<Profile />} />
          <Route path='admin/create-plane' element={<CreatePlan />} />
          <Route path='admin/plan/:planid' element={<UpdatePlan />} />
          <Route path='admin/plans' element={<Plans />} />
          <Route path='admin/user-list' element={<UserList />} />
          <Route path='admin/contact-us' element={<ContactUs />} />
          <Route path='admin/subscriber-list' element={<SubscriberList />} />
          <Route path='admin/feedbacks' element={<FeedbackList />} />
           <Route path='admin/gymrooms' element={<GymroomList />} />
          <Route path='admin/trainers' element={<TrainerList />} />
          <Route path="admin/gymrooms/:id/equipments" element={<Equipment />} />
        </Route>
         {/* staff routes ================================== */}
         <Route path='/dashboard' element={<StaffRoute/>}>
          <Route path='staff' element={<StaffDashBoard />} />
          <Route path='admin/profile' element={<Profile />} />
          <Route path='admin/create-plane' element={<CreatePlan />} />
          <Route path='staff/plan/:planid' element={<UpdatePlanStaff />} />
          <Route path='staff/plans' element={<PlansStaff />} />
            <Route path='staff/user-list/subscription' element={<SubscriptionList />} />
          <Route path='staff/user-list' element={<UserListStaff />} />
          <Route path='staff/sessions' element={<SessionsList />} />
          <Route path='admin/contact-us' element={<ContactUs />} />
          <Route path='admin/subscriber-list' element={<SubscriberList />} />
          <Route path='staff/feedbacks' element={<FeedbackList />} />
        </Route>
         {/* trainer routes ================================== */}
                <Route path='/dashboard' element={<TrainerRoute/>}>
          <Route path='trainer/user-list' element={<MemberList />} />
          <Route path='trainer/session-list' element={<SessionsListTrainer />} />
          <Route path='trainer' element={<TrainerDashBoard />} />
          <Route path='admin/profile' element={<Profile />} />
          <Route path='admin/create-plane' element={<CreatePlan />} />
          <Route path='admin/plan/:planid' element={<UpdatePlan />} />
          <Route path='staff/plans' element={<PlansStaff />} />
          
          <Route path='admin/contact-us' element={<ContactUs />} />
          <Route path='admin/subscriber-list' element={<SubscriberList />} />
          <Route path='staff/feedbacks' element={<FeedbackList />} />
          
        </Route>
          

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;


