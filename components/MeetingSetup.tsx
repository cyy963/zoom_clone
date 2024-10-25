"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: {setIsSetupComplete: (value:boolean) => void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }

  useEffect(() => {
    const toggleDevices = async () => {
      try {
        if (isMicCamToggledOn) {
          await call?.camera.disable();
          await call?.microphone.disable();
        } else {
          await call?.camera.enable();
          await call?.microphone.enable();
        }
      } catch (error) {
        console.error("Error accessing camera or microphone: ", error);
      }
    };
    
    toggleDevices();
  
    return () => {
      // Clean up on component unmount or if state changes
      call?.camera.disable();
      call?.microphone.disable();
    };
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
        
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={() => {
        call.join();

        setIsSetupComplete(true);
      }}>
        Join meeting
      </Button>
    </div>
  );
};
export default MeetingSetup;
