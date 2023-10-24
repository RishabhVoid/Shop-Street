"use client";

import useHandleSettings from "../../hooks/useHandleSettings";
import CardDetails from "../../widgets/CardDetails";
import Header from "../../widgets/Header";
import OrderDetailsPresets from "../../widgets/OrderDetailsPresets";

const Settings = () => {
  const {
    loading,
    user,
    userData,
    userId,
    handleSignOut,
    address,
    email,
    phoneNo,
    handleAddOrderDetailPreset,
    handleDeleteOrderDetailPreset,
    setAddress,
    setEmail,
    setPhoneNo,
  } = useHandleSettings();

  return (
    <div className="h-full flex flex-col overflow-x-hidden overflow-y-auto no_pad_scroll md:custom_scroll">
      <Header title="My settings" />
      {/*Card details*/}
      <CardDetails
        loading={loading}
        user={user}
        userData={userData}
        userId={userId}
        handleSignOut={handleSignOut}
      />
      {/*Order data*/}
      <OrderDetailsPresets
        address={address}
        email={email}
        phoneNo={phoneNo}
        handleAddOrderDetailPreset={handleAddOrderDetailPreset}
        handleDeleteOrderDetailPreset={handleDeleteOrderDetailPreset}
        setAddress={setAddress}
        setEmail={setEmail}
        setPhoneNo={setPhoneNo}
        userData={userData}
      />
    </div>
  );
};

export default Settings;
