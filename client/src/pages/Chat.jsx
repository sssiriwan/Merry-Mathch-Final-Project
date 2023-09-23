import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/authentication";
// chat/(match_list_id)

const ChatPage = () => {
  const { state } = useAuth();
  const [messageUser1, setMessageUser1] = useState("");
  const [messageUser2, setMessageUser2] = useState("");
  const [roomId, setRoomId] = useState();
  const [conversation, setConversation] = useState([]);

  const user1 = 278;
  const user2 = 286;
  const matchId = 278286; // match_list_id

  // room - chat
  // 1 - M

  const getAllMessage = async (roomId) => {
    const { data, error } = await supabase
      .from("message")
      .select("*")
      .eq("room_chat_id", roomId);
    setConversation(data);
  };

  const getRoomChat = async () => {
    const { data, error } = await supabase
      .from("room_chat")
      .select("*")
      .eq("match_list_id", matchId);
    if (data.length > 0) {
      const roomId = data[0].room_id;
      setRoomId(roomId);
      getAllMessage(roomId);
    }
  };

  const sendMessageUser1 = async () => {
    const { data, error } = await supabase.from("message").insert({
      user_id: user1,
      message_content: messageUser1,
      room_chat_id: roomId,
      timestampt: new Date(),
    });
  };

  const sendMessageUser2 = async () => {
    const { data, error } = await supabase.from("message").insert({
      user_id: user2,
      message_content: messageUser2,
      room_chat_id: roomId,
      timestampt: new Date(),
    });
  };

  const getLastMessage = async () => {
    const { data, error } = await supabase
      .from("message")
      .select("*")
      .order("timestampt", { ascending: false })
      .limit(1);
    setConversation((prev) => [...prev, data[0]]);
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);

    // Format the Date object as a time string
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return timeString;
  };

  // lisnter message event
  useEffect(() => {
    const channelA = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          // FIXME: filter specific room_id === match_listg_id
          // filter: "id=eq.1",
        },
        async (payload) => {
          await getLastMessage();
        }
      )
      .subscribe();

    return () => {
      channelA.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getRoomChat();
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="border-2">
          <div>User 1: 278</div>
          <input
            placeholder="Enter user massage"
            onChange={(e) => setMessageUser1(e.target.value)}
          />
          <button onClick={() => sendMessageUser1()}>send</button>
        </div>
        <div className="border-2">
          <div>User 2: 286</div>
          <input
            placeholder="Enter user massage"
            onChange={(e) => setMessageUser2(e.target.value)}
          />
          <button onClick={() => sendMessageUser2()}>send</button>
        </div>
      </div>

      <div className="mt-10">
        <p>History</p>
        {conversation?.map((item, index) => (
          <div key={item.message_id}>
            {convertTime(item.timestampt)} | User {item.user_id}:{" "}
            {item.message_content}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatPage;
