"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { IoMdExit } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";
import { VscFileSubmodule } from "react-icons/vsc";
import { VscNewFile } from "react-icons/vsc";
import { FaFileAlt } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import React from "react";
import { TiChevronRightOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Header from "@/app/Header";
import icon2 from "@/images/2.png"
import icon1 from "@/images/1.png"
import icon3 from "@/images/3.png"
import icon4 from "@/images/4.png"
import Image from "next/image";
import { BsFillSendFill } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";




const socket = io("http://localhost:3001/");

export default function RoomPage({ params }) {
  const room = params.roomcode;
  const router = useRouter();
  const [filename, setFilename] = useState("");
  const [files, setFiles] = useState([]);
  const [viewFile, setViewFile] = useState("");
  const [createFileBox, setCreateFileBox] = useState(false);
  const textRef = useRef(null);
  const numberRef = useRef(null);
  const [mode, setMode] = useState("FILES");
  const [user, setUser] = useState();
  const [locks, setLocks] = useState([]);
  const [messages, setMessages] = useState([{}]);
  const [message, setMessage] = useState();
  const [users, setUsers] = useState([]);
  const [isdark ,  setIsDark] = useState(false);

  // --------------------------------------------------------------------------------------------

  useEffect(() => {
    axios.get('/api/users/getuser').then((response) => {
      setUser(response.data.data)
    })
  }, []);

  const leaveRoom = () => {
    try {
      const t = toast.loading("please wait...");
      axios.get("/api/users/leaveroom").then((response) => {
      socket.emit("leave_room", room);
      toast.dismiss(t)
      toast.success("bye bye room");
        router.push("/room");
        
      });
    } catch (error) {}
  };

  const joinRoom = () => {
    if (room !== "") {
        socket.emit("join_room", { room  });
    }
  };

  const getsessiondata = () => {
    axios.post("/api/users/getsessiondata", { room }).then((res) => {
      setUsers(res.data.users);
      if (res.data.files != null) {
        setFiles([...res.data.files]);
      } else {
        console.log("your session has just created");
      }
    });
  };

  useEffect(() => {
    getsessiondata();
  }, []);

  useEffect(() => {
    joinRoom();
  }, []);

  const sendActions = (filename, cursorPos) => {
    console.log(room, user.username, filename, cursorPos,user.icon )
    socket.emit("action", { room, username:user.username, filename, cursorPos, icon:user.icon });
  };

  // --------------------------------------------------------------------------------------------

  const updateChange = (
    type,
    filename,
    data
  ) => {
    if (type == "CREATEFILE") {
      axios
        .post("/api/users/createfile", { filename, type, room })
        .then((res) => {
          socket.emit("create_file", { room, type, filename });
        });
    }
    if (type == "DELETEFILE") {
      axios
        .post("/api/users/deletefile", { filename, type, room })
        .then((res) => {
          socket.emit("delete_file", { room, type, filename });
        });
    }
    if (type == "EDIT") {
      axios
        .post("/api/users/editcontent", { filename, type, data, room })
        .then((res) => {
          socket.emit("edit_content", { room, filename, type, data });
        });
    }
  };

  const retrivechange = (type, filename) => {
    axios
      .post("/api/users/retrivechange", { room, type, filename })
      .then((res) => {
        if (type == "EDIT") {
          setFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.filename === filename
                ? {
                    ...res.data.files,
                  }
                : file
            )
          );
        }
        if (type == "CREATEFILE") {
          setFiles([...res.data.files]);
        }
        if (type == "DELETEFILE") {
          setFiles([...res.data.files]);
        }
      });
  };

  const removeLock = (name, cursor, filename) => {
    setLocks((prevlocks) =>
      prevlocks.map((lock) =>
        lock &&
        lock.filename === filename &&
        lock.name == name &&
        lock.cursorPos == cursor
          ? null
          : lock
      )
    );
  };



  const removeIconAtLine = (filename, cursorPos, icon, username) => {
    files.map((file) => {
      if (file.filename == filename && filename == viewFile) {
        const index1 = file.data.substr(0, cursorPos).split("\n").length;
        console.log(true);
      }
    });
  };

  useEffect(() => {
    socket.on("create_file_response", (data) => {
      retrivechange(data.type, data.filename);
    });
    socket.on("edit_content_response", (data) => {
      retrivechange(data.type, data.filename);
    });
    socket.on("delete_file_response", (data) => {
      retrivechange(data.type, data.filename);
    });
    socket.on("action_response", (data) => {
      setLocks([
        ...locks,
        {
          username: data.name,
          filename: data.filename,
          cursorPos: data.cursorPos,
          icon: data.icon
        },
      ]);
      // setIconAtLine(data.filename, data.cursorPos, data.icon, data.name);
      setTimeout(() => removeLock(data.n, data.cursorPos, data.filename), 5000);
      setTimeout(
        () =>
          removeIconAtLine(data.filename, data.cursorPos, data.icon, data.name),
        5000
      );
    });

    socket.on("message_response", (data) => {
      setMessages([
        ...messages,
        { username: data.username, message: data.message, icon: data.icon },
      ]);
    });
  }, [socket]);

  const createFile = () => {
    if (isValidFilename(filename) && filename.split(".").length == 2) {
      setFiles([...files, { filename: filename, data: "" }]);
      updateChange("CREATEFILE", filename, null);
      setFilename("");
    } else {
      console.log(filename + " is not a valid filename.");
    }
  };

  const deleteFile = (filename) => {
    if (filename != viewFile) {
      let a = [];
      files.map((file) => {
        if (file.filename != filename) {
          a.push(file);
        }
      });
      setFiles(a);
      updateChange("DELETEFILE", filename, null);
    }
  };
  const checkIfBothInSameLine = (data, cursorPosIn, cursorPosOut) => {
    const index1 = data.substr(0, cursorPosIn).split("\n").length;
    const index2 = data.substr(0, cursorPosOut).split("\n").length;
    console.log(index1, index2);
    return index1 == index2;
  };

  const handleContentChangeForReal = (data, filename) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.filename === filename
          ? {
              ...file,
              data: data,
            }
          : file
      )
    );
    sendActions(filename, textRef.current.selectionStart);
    updateChange("EDIT", filename, data);
    updateLineNumbers();
  };

  const handleContentChange = (e, filename) => {
    let a = true;
    locks.map((lock) => {
      if (lock) {
        if (
          lock.filename == filename &&
          checkIfBothInSameLine(
            e.target.value,
            lock.cursorPos,
            textRef.current.selectionStart
          )
        ) {
          a = false;
          textRef.current.blur();
          toast.error("Cannot change");
        }
      }
    });

    if (a) {
      handleContentChangeForReal(e.target.value, filename);
    } else {
      retrivechange("EDIT", filename);
    }
  };
  const updateLineNumbers = () => {
    files.map((file) => {
      if (file && file.filename == viewFile) {
        const lineNumberHTML = file.data
          .split("\n")
          .map((_, index) => `<p class="line-number">${index + 1}</p>`)
          .join("");
        numberRef.current.innerHTML = lineNumberHTML;
      }
    });
  };
  useEffect(() => {
    updateLineNumbers();
  }, [viewFile]);

  const sendMessage = () => {
    if (message != null || message != "") {
      setMessages([
        ...messages,
        {
          message: message,
          username: user.username,
          icon: user.icon,
        },
      ]);
      socket.emit("message", {
        message: message,
        room: room,
        username: user.username,
        icon: user.icon,
      });
    }
  };

  return (
    <>
      <div className="h-screen content dark:bg-gradient-to-r dark:from-blue-800 dark:to-indigo-900 p-10 pt-4  dark:text-[#e9e9f9]">
        <Header />

        <div className="h-[87%] w-full  flex flex-row">
          <div className=" dark:bg-[#212141] h-[100%] w-[5%] p-4 flex flex-col justify-start rounded-lg">

            <CiChat1
              onClick={() => {
                setMode("CHAT");
              }}
              size={40}
              className="bg-[#00adf1] hover:border-slate-300 dark:text-black   mb-3 p-2 rounded-md  hover:border-2 dark:bg-[#00adf1] dark:hover:border-slate-300 "
            />
            <VscFileSubmodule
              size={40}
              onClick={() => {
                setMode("FILES");
              }}
              className=" bg-[#00adf1] hover:border-slate-300 dark:text-black   mb-3 p-2 rounded-md  hover:border-2 dark:bg-[#00adf1] dark:hover:border-slate-300"
            />
            <IoMdExit
              onClick={leaveRoom}
              size={40}
              className="bg-slate-300 mb-3 dark:text-black p-2 rounded-lg hover:bg-red-500/80 "
            />
          <button onClick={()=>setIsDark(!isdark)}>{isdark? <><MdOutlineDarkMode size={40}
              className={` mb-3 ${isdark? "hover:bg-slate-300 bg-slate-500/80":"bg-slate-300 hover:bg-slate-500/80 "} dark:text-black p-2 rounded-lg  `} /></>:
              <><CiLight size={40}
              className={` mb-3 ${isdark? "hover:bg-slate-300 bg-slate-500/80":"bg-slate-300 hover:bg-slate-500/80 "} dark:text-black p-2 rounded-lg  `} /></>}</button>

          </div>
          {mode == "FILES" ? (
            <>
              <div className="  dark:bg-[#21214140] border  border-slate-400 h-[100%] w-[17%] rounded-lg flex flex-col p-2 font-bold text-slate-500">
                <div  className="flex justify-evenly">
                  Roomcode: <p className="text-[#b5daff]">{room}</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[90%] mb-8 m-[3%] h-8">
                  {createFileBox ? (
                    <>
                      <input
                        id="id"
                        className="w-[80%] h-8 bg-[#1e293b] rounded-md text-[#8f9eb3] text-center  "
                        placeholder="Filename...."
                        type="text"
                        autoComplete="off"
                        value={filename}
                        onChange={(e) => {
                          setFilename(e.target.value);
                        }}
                      />
                      <button onClick={createFile}>
                        {" "}
                        <TiTick size={25} />{" "}
                      </button>{" "}
                      <ImCancelCircle
                        onClick={() => {
                          setCreateFileBox(!createFileBox);
                        }}
                      />
                    </>
                  ) : (
                    <>

                    
                      <div
                        onClick={() => {
                          setCreateFileBox(!createFileBox);
                        }}
                        className=" text-slate-400 w-[90%] m-[3%] h-8 rounded-lg flex flex-row items-center justify-center"
                      >
                        <VscNewFile size={20} className="m-2" /> New File
                      </div>
                    </>
                  )}
                </div>

                {files.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className={` w-[90%] m-[2%] h-8 ${
                        file && viewFile == file.filename
                          ? " text-[#0ea5e9] border-[#0ea5e9] "
                          : "hover:text-slate-200 hover:border-slate-200  border-slate-500  "
                      }  text-[#586478] flex flex-row items-center  border-l-2   justify-start`}
                    >
                      <p
                        onClick={() => {
                          setViewFile(file.filename);
                        }}
                        className={`w-[65%] ${
                          file && viewFile == file.filename
                            ? "text-[#0ea5e9]"
                            : " "
                        }  ml-2 `}
                      >
                        {" "}
                        {file ? file.filename : <></>}
                      </p>

                      <MdOutlineDelete
                        onClick={() => {
                          deleteFile(file.filename);
                        }}
                        className=" w-[15%] "
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="dark:bg-[#21214140] bg-white/10 backdrop-blur-xl border border-slate-400 h-[100%] w-[17%] rounded-lg flex flex-col font-bold text-slate-500">
                <div className="w-[100%] h-[30%] ">
                     <p className=" text-white border-b border-white/30" >Users Online</p>  
                      {users.map((user) =>{
                        return  <p className="flex item-center m-4 gap-2 justify-center text-[#b5daff]" > 
                          
                          {user.icon == "icon1" && <> <Image src={icon1} alt={""} width={20} height={20}  /> </>}
                          {user.icon == "icon2" && <> <Image src={icon2} alt={""}  width={20} height={20}  /> </>}
                          {user.icon == "icon3" && <> <Image src={icon3} alt={""}   width={20} height={20} /> </>}
                          {user.icon == "icon4" && <> <Image src={icon3} alt={""}  width={20} height={20}  /> </>}
                          {user.username} </p>
                      })}
                </div>
                <div className=" border-t border-slate-300 w-[100%] h-[50%] rounded-md ">
                  {messages &&
                    messages.map((message, index) => {
                      return (
                        <p key={index}>
                          {" "}
                          {message.username} : {message.message}
                        </p>
                      );
                    })}
                </div>
                <div className=" w-[100%] h-[20%] flex flex-row p-[5%] justify-between items-center">
                  <input
                    type="text"
                    className="w-[90%] h-[50%] rounded-md"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <button onClick={sendMessage} className=" ml-1 w-[10%]">
                    <BsFillSendFill size={20} className="text-[#00adf1]" />
                  </button>
                </div>
              </div>
            </>
          )}

          <div className=" dark:bg-[#212141]  h-[100%] w-[78%] rounded-lg p-5">
            <div className="w-[100%] h-[96%] mb-[2%]  rounded-lg flex flex-row">
              <div className="h-[100%] w-[5%] ">
                {locks.map((lock,index)=>{
                  if(lock){
                    if(lock.icon == "icon1"){
                      return <Image alt='cool 'src={icon1} width={30} height={30} key={index} />
                    }
                    if(lock.icon == "icon2"){
                      return <Image alt='cool 'src={icon2} width={30} height={30} key={index} />
                    }
                    if(lock.icon == "icon3"){
                      return <Image alt='cool 'src={icon3} width={30} height={30} key={index} />
                    }
                    if(lock.icon == "icon4"){
                      return <Image alt='cool 'src={icon4} width={30} height={30} key={index} />
                    }
                  }
                })}
              </div>
              <div
                ref={numberRef}
                id="line-numbers"
                className="h-[100%] w-[3%] flex flex-col pt-3 text-[#b5daff] text-sm m-0 "
              ></div>
              <div className="h-[100%] w-[92%] 0 p-3">
                {files &&
                  files.map((file, index) => {
                    if (file && file.filename == viewFile) {
                      let fileext = file.filename.split(".");
                      let ext;
                      if (fileext[1] == "py") {
                        ext = fileext[1];
                      } else if (fileext[1] == "js") {
                        ext = fileext[1];
                      } else if (fileext[1] == "java") {
                        ext = fileext[1];
                      } else if (fileext[1] == "rs") {
                        ext = fileext[1];
                      } else {
                        ext = "js";
                      }
                      return (
                        <CodeEditor
                          key={index}
                          autoFocus
                          autoComplete="off"
                          language={ext}
                          ref={textRef}
                          style={
                           {
                             backgroundColor:`${isdark ? "#212141":"#faebefee"}`,
                             color:`${isdark ? "#ffffff":"#000000"}`
                            }
                          }
                          className="w-[100%] h-[100%]   border backdrop-blur-xl border-black rounded-md"
                          value={file.data}
                          onChange={(e) => {
                            e.preventDefault();
                            handleContentChange(e, file.filename);
                          }}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function isValidFilename(filename) {
  var validFilenameRegex = /^[a-zA-Z0-9-_\.]+$/;
  return validFilenameRegex.test(filename);
}
