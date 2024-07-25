import { ArrowDownOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, LogoutOutlined, SendOutlined } from "@ant-design/icons";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { Button, Col, Divider, Form, Layout, notification, Row, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content, Footer, Header } from "antd/es/layout/layout";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LS_CHAT, LS_USER_DATA } from "../../const";
import LogoutFlow from "../../flow/login/LogoutFlow";
import SearchMessageFlow from "../../flow/message/SearchMessageFlow";
import { IChatMessage, StatusChatMessage, StatusChatMessageTranslate, TypeOfMessage } from "../../models/IChatMessage";
import { IMessageControl } from "../../models/IMessageControl";
import { getDayPastAsText } from "../../utils";

export const HomePage = () => {


  // const [messageControl, setMessageControl] = useState<IMessageControl>()
  // const [_inSecondPlan, setInSecondPlan] = useState<boolean>(false)
  // const [creatingQueue, setCreatingQueue] = useState<boolean>(false)
  // const [consumer, setConsumer] = useState<Client>()
  // const [loadingMessages, setLoadingMessages] = useState<boolean>(false)
  // const [_publishingMessage, setPublishingMessage] = useState<boolean>(false)

  // const [form] = Form.useForm()
  // const refInputMessage = useRef(null);
  // const contentRef = useRef(null);
  // const navigate = useNavigate()

  // const userDataStr = localStorage.getItem(LS_USER_DATA);
  // if (userDataStr === undefined || userDataStr === null) {
  //   throw Error("Invalid session")
  // }
  // const userData = JSON.parse(userDataStr);

  // // const createQueue = async (userId: string): Promise<string> => {
  // //   setCreatingQueue(true)
  // //   try {
  // //     const response = await CreateQueueToSessionMessageFlow.exec(userId, userData.access)
  // //     return response.data.queue
  // //   } catch (error: any) {
  // //     notification.warning({
  // //       message: "Falha ao criar sessão",
  // //       description: error.message,
  // //       duration: 5,
  // //       placement: "topRight",
  // //     })
  // //   } finally {
  // //     setCreatingQueue(false)
  // //   }
  // //   return Promise.reject()
  // // }

  // const scrollToBottom = () => {
  //   const contentElement = contentRef.current;
  //   if (contentElement) {
  //     (contentElement as any).scrollTop = (contentElement as any).scrollHeight;
  //   }
  // }

  // const logout = async () => {
  //   try {
  //     consumer?.deactivate()
  //     consumer?.forceDisconnect()
  //     await LogoutFlow.exec()
  //     navigate("/login")
  //   } catch (error: any) {
  //     notification.warning({
  //       message: "Falha ao realizar logout",
  //       description: error.message,
  //       duration: 5,
  //       placement: "topRight",
  //     })
  //   }
  // }

  // const searchMessages = async (filtersAux: any) => {
  //   setLoadingMessages(true)
  //   try {

  //     // const mc = messageControls.find((mc: IMessageControl) => mc.patient._id === messageControl?.patient._id) as IMessageControl
  //     const response = await SearchMessageFlow.exec({
  //       ...filtersAux,
  //       // notIn_id: messageControl?.messages.map((cm: IChatMessage) => cm._id)
  //       sendDateTimeRange: [null, messageControl?.messages[0]?.sendDateTime ?? new Date()]
  //     })
  //     let oldMessages = response.data.items as IChatMessage[]
  //     if (oldMessages?.length) {
  //       setMessageControl((prevMessages: IMessageControl | undefined) => {
  //         const idsToRemove = new Set(prevMessages?.messages.map((cm: IChatMessage) => cm._id));
  //         oldMessages = oldMessages.filter((om: IChatMessage) => !idsToRemove.has(om._id));

  //         if (prevMessages) {
  //           prevMessages.messages = [...oldMessages, ...prevMessages.messages]
  //         }

  //         return { ...prevMessages } as IMessageControl
  //       });
  //     }
  //   } catch (error: any) {
  //     notification.warning({
  //       message: "Falha ao carregar mensagem",
  //       description: error.message,
  //       duration: 5,
  //       placement: "topRight",
  //     })
  //   } finally {
  //     setLoadingMessages(false)
  //   }
  // }

  // const publishMessage = async (values: any) => {
  //   // setPublishingMessage(true)
  //   // try {
  //   const payload: IChatMessage = {
  //     content: values.content,
  //     author: userData.user._id,
  //     authorName: userData.user.nickName,
  //     status: StatusChatMessage.NOT_SENT,
  //     sendDateTime: new Date(),
  //     queue: messageControl?.queue,
  //     routerKey: `rk_${userData.user._id}`,
  //     type: TypeOfMessage.CHAT_MESSAGE
  //   } as IChatMessage

  //   //   setMessageControl((prevMessages: IMessageControl | undefined) => {
  //   //     if (prevMessages) {
  //   //       prevMessages.messages = [...prevMessages.messages, payload]
  //   //     }
  //   //     return { ...prevMessages } as IMessageControl
  //   //   });
  //   //   const response = await PublishMessageFlow.exec(payload)
  //   //   setMessageControl((prevMessages: IMessageControl | undefined) => {
  //   //     if (prevMessages) {
  //   //       const indexMessage = prevMessages?.messages.findIndex((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(payload.sendDateTime).getTime())
  //   //       if (indexMessage && indexMessage > -1) {
  //   //         prevMessages.messages[indexMessage] = response.data
  //   //       }
  //   //     }
  //   //     return { ...prevMessages } as IMessageControl
  //   //   });
  //   // } catch (error: any) {
  //   //   notification.warning({
  //   //     message: "Falha ao enviar mensagem",
  //   //     description: error,
  //   //     duration: 5,
  //   //     placement: "topRight",
  //   //   })
  //   // } finally {
  //   //   setPublishingMessage(false)
  //   // }

  //   if (consumer?.connected) {
  //     const destination = `/topic/chat_user_${userData.user._id}`;
  //     consumer.publish({
  //       destination: destination,
  //       body: JSON.stringify(payload),
  //     });
  //   }
  // };

  // const playNotificationSound = () => {
  //   try {
  //     setInSecondPlan((prev: boolean) => {
  //       if (prev) {
  //         const audio = new Audio("/notification-sound.mp3");
  //         audio.play();
  //       }
  //       return prev
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  // const initializeMessageControls = async () => {
  //   const chatDataStr = localStorage.getItem(LS_CHAT);
  //   if (chatDataStr) {
  //     const chatData = JSON.parse(chatDataStr) as IMessageControl;
  //     setMessageControl({ ...chatData, subscribed: false })
  //     return
  //   }

  //   // const patients = await loadPatients()
  //   const messageControl: IMessageControl = {} as IMessageControl
  //   // messageControl.queue = await createQueue(userData.user._id)
  //   messageControl.messages = []
  //   messageControl.subscribed = false
  //   messageControl.amountNewMessages = 0

  //   localStorage.setItem(LS_CHAT, JSON.stringify(messageControl));
  //   setMessageControl(messageControl)
  // }

  // useEffect(() => {
  //   initializeMessageControls()
  //   return () => {
  //     consumer?.forceDisconnect()
  //   }
  // }, [])

  // // CONECTAR AO BROKER
  // useEffect(() => {
  //   const mc = localStorage.getItem(LS_CHAT);
  //   if (mc) {
  //     searchMessages({ routerKey: `rk_${userData.user._id}`, orderSense: "asc", orderBy: "sendDateTime", pageable: false })
  //   }
  //   if (consumer?.active && consumer?.connected) {
  //     return
  //   }
  //   const client = new Client({
  //     brokerURL: import.meta.env.VITE_BROKER_URL,
  //     connectHeaders: {
  //       login: import.meta.env.VITE_BROKER_USER,
  //       passcode: import.meta.env.VITE_BROKER_PASSWORD,
  //     },
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     reconnectDelay: 4000,
  //     heartbeatIncoming: 4000, // Milissegundos
  //     heartbeatOutgoing: 4000, // Milissegundos
  //     onConnect: () => {
  //       console.log('Connected to RabbitMQ - ', `${import.meta.env.VITE_BROKER_URL}`);
  //       setConsumer(client)
  //     },
  //     onDisconnect: () => {
  //       console.log('Disconnected to RabbitMQ2 - ', `${import.meta.env.VITE_BROKER_URL}`);
  //     },
  //     onStompError: (frame: any) => {
  //       console.error('Broker reported error: ' + frame.headers['message']);
  //       console.error('Additional details: ' + frame.body);
  //     },
  //   });
  //   client.activate()
  // }, [])

  // // CONTROLA AS ASSINATURAS
  // useEffect(() => {
  //   if (!messageControl) {
  //     return
  //   }

  //   if (!consumer?.connected) {
  //     return
  //   }

  //   if (messageControl?.subscribed) {
  //     return
  //   }
  //   console.log("ASSINANDO TOPICOS")
  //   // consumer.subscribe(`${messageControl?.queue}`, async (payload: IMessage) => {
  //   //   try {
  //   //     const message = JSON.parse(payload.body.toString()) as IChatMessage
  //   //     setMessageControl((prevMessages: IMessageControl | undefined) => {
  //   //       if (prevMessages && prevMessages.messages.some((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime()) === false) {
  //   //         prevMessages.messages = [...prevMessages.messages, message];
  //   //         prevMessages.amountNewMessages++
  //   //         playNotificationSound()
  //   //       }

  //   //       return { ...prevMessages } as IMessageControl
  //   //     });

  //   //     await ReceivedMessageAckFlow.exec(message._id)

  //   //     payload.ack()
  //   //   } catch (error) {
  //   //     payload.nack()
  //   //   }
  //   // }, { ack: 'client' });

  //   consumer.subscribe(`/topic/chat_user_${userData.user._id}`, async (payload: IMessage) => {
  //     try {
  //       const message = JSON.parse(payload.body.toString()) as IChatMessage
  //       setMessageControl((prevMessages: IMessageControl | undefined) => {

  //         if (message.type === TypeOfMessage.CHAT_MESSAGE) {
  //           if (prevMessages && prevMessages.messages.some((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime()) === false) {
  //             prevMessages.messages = [...prevMessages.messages, message];
  //             prevMessages.amountNewMessages++
  //             playNotificationSound()
  //             if (message.author !== userData.user._id) {
  //               if (consumer?.connected) {
  //                 const payloadReceived: IChatMessage = {
  //                   sendDateTime: message.sendDateTime,
  //                   type: TypeOfMessage.RECEIVED,
  //                   receivedBy: userData.user._id,
  //                   receivedDateTime: new Date()
  //                 } as IChatMessage
  //                 const destination = `/topic/chat_user_${userData.user._id}`; // Substitua pelo nome da sua exchange
  //                 const headers = {
  //                   'content-type': 'text/plain',
  //                 };
  //                 consumer.publish({
  //                   destination: destination,
  //                   headers: headers,
  //                   body: JSON.stringify(payloadReceived),
  //                 });
  //               }
  //             }
  //           }

  //         }

  //         if (message.type === TypeOfMessage.RECEIVED) {
  //           const existingMessage = prevMessages?.messages.find((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime())
  //           if (existingMessage) {
  //             if (!existingMessage.receivements?.length) {
  //               existingMessage.receivements = []
  //             }
  //             existingMessage.receivements.push({
  //               receivedBy: message.receivedBy,
  //               receivedDateTime: new Date(message.receivedDateTime)
  //             })
  //             existingMessage.status = StatusChatMessage.RECEIVED
  //           }
  //         }

  //         if (message.type === TypeOfMessage.SEEN) {
  //           const existingMessage = prevMessages?.messages.find((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime())
  //           if (existingMessage) {
  //             if (!existingMessage.seens?.length) {
  //               existingMessage.seens = []
  //             }
  //             existingMessage.seens.push({
  //               seenBy: message.seenBy,
  //               seenDateTime: new Date(message.seenDateTime)
  //             })
  //             existingMessage.status = StatusChatMessage.SEEN
  //           }
  //         }

  //         return { ...prevMessages } as IMessageControl
  //       });
  //       payload.ack()
  //     } catch (error) {
  //       payload.nack()
  //     }
  //   }, { ack: 'client' })
  //   setMessageControl((prevMessages: IMessageControl | undefined) => {
  //     if (prevMessages)
  //       prevMessages.subscribed = true
  //     return { ...prevMessages } as IMessageControl
  //   });
  // }, [consumer])


  // // MANTEM ARMAZENAMENTO LOCAL ATUALIZADO
  // useEffect(() => {
  //   if (messageControl) {
  //     localStorage.setItem(LS_CHAT, JSON.stringify(messageControl));
  //     scrollToBottom()

  //   }
  // }, [messageControl])

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       setInSecondPlan(true)
  //     } else {
  //       setInSecondPlan(false)
  //     }
  //   };

  //   const handleBlur = () => {
  //     setInSecondPlan(true)
  //   };

  //   const handleFocus = () => {
  //     setInSecondPlan(false)
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   window.addEventListener('blur', handleBlur);
  //   window.addEventListener('focus', handleFocus);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     window.removeEventListener('blur', handleBlur);
  //     window.removeEventListener('focus', handleFocus);
  //   };
  // }, []);
  const [messageControl, setMessageControl] = useState<IMessageControl>()
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false)
  // const [loadingPatients, setLoadingPatients] = useState<boolean>(false)
  // const [messageControls, setMessageControls] = useState<IMessageControl[]>([])
  const [consumer, setConsumer] = useState<Client>()
  const [inSecondPlan, setInSecondPlan] = useState<boolean>(false)
  const [_subscriptionsTopic, setSubscriptinsTopic] = useState<StompSubscription[]>([])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const refInputMessage = useRef(null);
  const contentRef = useRef(null);

  const userDataStr = localStorage.getItem(LS_USER_DATA);
  if (userDataStr === undefined || userDataStr === null) {
    throw Error("Invalid session")
  }
  const userData = JSON.parse(userDataStr);

  const logout = async () => {
    try {
      consumer?.deactivate()
      consumer?.forceDisconnect()
      await LogoutFlow.exec()
      navigate("/login")
    } catch (error: any) {
      notification.warning({
        message: "Falha ao realizar logout",
        description: error.message,
        duration: 5,
        placement: "topRight",
      })
    }
  }

  const publishMessage = async (payload: IChatMessage) => {
    setMessageControl((prev: IMessageControl | undefined) => {
      if (prev) {
        prev.messages = [payload, ...prev.messages];
      }
      return { ...prev } as IMessageControl
    })

    if (consumer?.connected) {
      const destination = `/exchange/chat-message`;
      consumer.publish({
        destination: destination,
        body: JSON.stringify(payload),
      });
    }
  };

  const subscribing = async () => {
    setConsumer((prevConsumer: Client | undefined) => {
      setMessageControl((prevMC: IMessageControl | undefined) => {
        setSubscriptinsTopic((prevSubscriptions: StompSubscription[]) => {
          prevSubscriptions.forEach(sub => {
            console.log("unsubscribing: ", sub.id)
            sub.unsubscribe()
          });
          return prevSubscriptions
        })

        console.log("ASSINANDO TOPICOS")
        const newSubscribes: StompSubscription[] = []
        console.log("subscribing", `/topic/chat_user_rk_${userData.user._id}`)
        const sub = prevConsumer?.subscribe(`/topic/chat_user_rk_${userData.user._id}`, async (payload: IMessage) => {
          try {
            const message = JSON.parse(payload.body.toString()) as IChatMessage
            console.log(`R: /topic/chat_user_rk_${userData.user._id}`, message)
            setMessageControl((prevMC2: IMessageControl | undefined) => {
              if (!prevMC2) return prevMC2

              if (message.type === TypeOfMessage.CHAT_MESSAGE) {
                const existingMessage = prevMC2?.messages?.find((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime())

                if (existingMessage) {
                  existingMessage._id = message._id
                  existingMessage.status = message.status
                } else {
                  prevMC2.messages = [message, ...prevMC2.messages];
                  prevMC2.amountNewMessages++
                  playNotificationSound()
                  if (message.author !== userData.user._id) {
                    if (prevConsumer?.connected) {
                      const payload: IChatMessage = {} as IChatMessage
                      payload._id = message._id
                      payload.sendDateTime = message.sendDateTime
                      setMessageControl((prevMC3: IMessageControl | undefined) => {
                        payload.type = TypeOfMessage.RECEIVED
                        payload.receivedBy = userData.user._id
                        payload.receivedDateTime = new Date()
                        payload.account = userData.account
                        prevConsumer.publish({
                          destination: `/exchange/chat-message`,
                          body: JSON.stringify(payload),
                        });

                        setInSecondPlan((secondPlan: boolean) => {
                          if (!secondPlan) {
                            const payloadSeen = {
                              ...payload,
                              type: TypeOfMessage.SEEN,
                              seenBy: userData.user._id,
                              seenDateTime: new Date(),
                              receivedBy: undefined,
                              receivedDateTime: undefined,
                            } as unknown as IChatMessage

                            prevConsumer.publish({
                              destination: `/exchange/chat-message`,
                              body: JSON.stringify(payloadSeen),
                            });
                          }
                          return secondPlan
                        })
                        return prevMC3
                      })
                    }
                  }
                }
              }

              if (message.type === TypeOfMessage.RECEIVED) {
                const existingMessage = prevMC2?.messages.find((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime())
                if (existingMessage) {
                  if (!existingMessage.receivements?.length) {
                    existingMessage.receivements = []
                  }
                  existingMessage.receivements.push({
                    receivedBy: message.receivedBy,
                    receivedDateTime: new Date(message.receivedDateTime)
                  })
                  existingMessage.status = StatusChatMessage.RECEIVED
                }
              }

              if (message.type === TypeOfMessage.SEEN) {
                const existingMessage = prevMC2?.messages.find((m: IChatMessage) => new Date(m.sendDateTime).getTime() === new Date(message.sendDateTime).getTime())
                if (existingMessage) {
                  if (!existingMessage.seens?.length) {
                    existingMessage.seens = []
                  }
                  existingMessage.seens.push({
                    seenBy: message.seenBy,
                    seenDateTime: new Date(message.seenDateTime)
                  })
                  existingMessage.status = StatusChatMessage.SEEN
                }
              }

              return { ...prevMC2 }
            });
            payload.ack()
          } catch (error) {
            payload.nack()
          }
        }, { ack: 'client' })
        newSubscribes.push(sub as StompSubscription)
        setSubscriptinsTopic([...newSubscribes])
        return prevMC
      })
      return prevConsumer
    })

  }

  const init = async () => {
    const chatDataStr = localStorage.getItem(LS_CHAT);
    if (chatDataStr) {
      setMessageControl(JSON.parse(chatDataStr) as IMessageControl)
    } else {
      const mc: IMessageControl = {} as IMessageControl
      // mc.patient = patient
      mc.messages = []
      mc.subscribed = false
      mc.amountNewMessages = 0
      localStorage.setItem(LS_CHAT, JSON.stringify(mc));
      setMessageControl(mc)
    }
    connectBroker()
  }

  const connectBroker = () => {
    console.log("Criando conexão com broker...")
    if (consumer) {
      consumer.deactivate()
      consumer.forceDisconnect()
    }
    setConsumer((prev: Client | undefined) => {
      return new Client({
        brokerURL: import.meta.env.VITE_BROKER_URL,
        connectHeaders: {
          login: import.meta.env.VITE_BROKER_USER,
          passcode: import.meta.env.VITE_BROKER_PASSWORD,
        },
        reconnectDelay: 500,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('Connected - ', `${import.meta.env.VITE_BROKER_URL}`);
          subscribing()
        },
        onDisconnect: () => {
          console.log('Disconnected to RabbitMQ2 - ', `${import.meta.env.VITE_BROKER_URL}`);
        },
        onStompError: (frame: any) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
        onChangeState: (param: any) => {
          console.log('onChangeState: ', param);
        },
        onWebSocketError: (param: any) => {
          console.error('onWebSocketError: ', param);
        },
        onWebSocketClose: (param: any) => {
          console.log('onWebSocketClose: ', param);
          prev?.deactivate()
        },
        onUnhandledFrame: (param: any) => {
          console.log('onUnhandledFrame: ', param);
        },
        onUnhandledReceipt: (param: any) => {
          console.log('onUnhandledReceipt: ', param);
        },
        onUnhandledMessage: (param: any) => {
          console.log('onUnhandledMessage: ', param);
        },
      });
    })
  }

  const searchMessages = async () => {
    setLoadingMessages(true)
    try {
      let lastSentDateTime = messageControl?.messages[messageControl?.messages.length - 1]?.sendDateTime ?? new Date()
      lastSentDateTime = moment(lastSentDateTime).subtract(1, "second").toDate()
      const response = await SearchMessageFlow.exec({
        routerKey: `rk_${userData.user._id}`,
        sendDateTimeRange: [null, lastSentDateTime],
        orderSense: "desc",
        orderBy: "sendDateTime",
      })
      let oldMessages = response.data.items as IChatMessage[]
      if (oldMessages?.length) {
        setMessageControl((prevMessages: IMessageControl | undefined) => {
          const idsToRemove = new Set(messageControl?.messages.map((cm: IChatMessage) => cm._id));
          oldMessages = oldMessages.filter((om: IChatMessage) => !idsToRemove.has(om._id));

          if (!prevMessages) {
            prevMessages = {
              messages: [] as IChatMessage[]
            } as IMessageControl
          }
          if (prevMessages?.messages) {
            prevMessages.messages = [...prevMessages.messages, ...oldMessages]
          }

          return { ...prevMessages } as IMessageControl
        });
      }
    } catch (error: any) {
      notification.warning({
        message: "Falha ao carregar mensagem",
        description: error.message,
        duration: 5,
        placement: "topRight",
      })
    } finally {
      setLoadingMessages(false)
    }
  }

  const playNotificationSound = () => {
    try {

      setInSecondPlan((currSP: boolean) => {
        if (currSP) {
          const audio = new Audio("/notification-sound.mp3");
          audio.play();
        }
        return currSP
      })
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    init()
    searchMessages()
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setInSecondPlan(true)
      } else {
        setInSecondPlan(false)
      }
    };

    const handleBlur = () => {
      setInSecondPlan(true)
    };

    const handleFocus = () => {
      setInSecondPlan(false)
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [])

  useEffect(() => {
    if (consumer && !consumer?.active) {
      console.log("ativando conexao com broker")
      consumer?.activate()
    }
  }, [consumer])

  // MANTEM ARMAZENAMENTO LOCAL ATUALIZADO
  useEffect(() => {
    if (messageControl) {
      localStorage.setItem(LS_CHAT, JSON.stringify(messageControl));
    }
  }, [messageControl])

  useEffect(() => {
    if (inSecondPlan === false) {
      if (messageControl && consumer) {
        console.log("FOCUS")
        const messagesUnseens = messageControl.messages.filter((cm: IChatMessage) => cm._id && cm.status !== StatusChatMessage.SEEN && cm.author !== userData.user._id)
        messagesUnseens.forEach((message: IChatMessage) => {
          const payload: IChatMessage = {} as IChatMessage
          payload._id = message._id
          payload.sendDateTime = message.sendDateTime

          payload.type = TypeOfMessage.SEEN
          payload.seenBy = userData.user._id
          payload.seenDateTime = new Date()

          consumer.publish({
            destination: `/exchange/chat-message`,
            body: JSON.stringify(payload),
          });
        })
      }
    }
  }, [inSecondPlan])

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ height: '8vh' }}>
        <Row justify="start">
          <Col span={12} style={{ textAlign: "start" }}>
            {userData.user.fullName}
          </Col>
          <Col span={12} style={{ textAlign: "end" }}>
            <Button onClick={logout} icon={<LogoutOutlined />}>Logout</Button>
          </Col>
        </Row>
      </Header>

      <Layout style={{ height: '90vh' }}>
        <Content>
          <Layout style={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <Content
              ref={contentRef}
              style={{
                alignContent: "flex-end",
                overflowY: "auto",
                flexDirection: "column-reverse",
                display: "flex",
              }}>
              {messageControl?.messages && messageControl?.messages.map((chatMessage: IChatMessage, index: number) => (
                <div key={index}>

                  {/* label dias anteriores */}
                  <Row justify="center">
                    {messageControl.messages[index + 1] && moment(chatMessage.sendDateTime).date() !== moment(messageControl.messages[index + 1].sendDateTime).date() && (
                      <Col span={12}>
                        <Divider>{getDayPastAsText(moment(messageControl.messages[index].sendDateTime))} <ArrowDownOutlined /></Divider>
                      </Col>
                    )}
                  </Row>
                  <Row justify="start" key={index} style={{ marginBottom: "4px" }}>
                    <Col span={12} offset={6} style={{ textAlign: userData.user._id === chatMessage.author ? "end" : "start" }}>
                      <Tag style={{ textWrap: "wrap", width: "auto", color: "black" }} color={userData.user._id === chatMessage.author ? "#d9fdd2" : "#fff"}>
                        <span><b>{userData.user._id === chatMessage.author ? "Você" : chatMessage?.authorName ?? "user"}: </b>{chatMessage.content}</span>
                        <br />
                        {userData.user._id === chatMessage.author && (
                          <>
                            <span style={{ color: "#ccc", textAlign: "end", fontStyle: "italic", display: "flex", float: "inline-end", gap: "4px" }}>
                              {moment().date() - moment(chatMessage.sendDateTime).date() > 0 ? moment(chatMessage.sendDateTime).format("DD/MM/YYYY HH:mm") : moment(chatMessage.sendDateTime).format("HH:mm")}
                              <Tooltip title={StatusChatMessageTranslate[chatMessage.status]}>
                                {chatMessage.status === StatusChatMessage.NOT_SENT && <ClockCircleOutlined />}
                                {chatMessage.status === StatusChatMessage.SENT && <CheckOutlined />}
                                {chatMessage.status === StatusChatMessage.RECEIVED && <CheckCircleOutlined style={{ color: "skyblue" }} />}
                                {chatMessage.status === StatusChatMessage.SEEN && <CheckCircleOutlined style={{ color: "green" }} />}
                              </Tooltip>
                            </span>
                          </>
                        )}
                        {userData.user._id !== chatMessage.author && (
                          <span style={{ color: "#ccc", textAlign: "end", fontStyle: "italic", display: "flex", float: "inline-end", gap: "4px" }}>
                            {moment().date() - moment(chatMessage.sendDateTime).date() > 0 ? moment(chatMessage.sendDateTime).format("DD/MM/YYYY HH:mm") : moment(chatMessage.sendDateTime).format("HH:mm")}
                          </span>
                        )}
                      </Tag>
                    </Col>
                  </Row>
                </div>
              ))}
              <Row justify="center">
                <Col span={12} style={{ textAlign: "center" }}>
                  <Button loading={loadingMessages} onClick={() => {
                    searchMessages()
                  }}>{loadingMessages ? "Carregando..." : "Carregar anteriores"}</Button>
                </Col>
              </Row>
            </Content>
            <Footer style={{ flex: "0 0 auto", padding: 0 }}>
              <Form form={form} layout="vertical"
                onFinish={(v: any) => {
                  const payload = {
                    content: v.content,
                    author: userData.user._id,
                    authorName: userData.user.nickName,
                    status: StatusChatMessage.NOT_SENT,
                    sendDateTime: new Date(),
                    queue: messageControl?.queue,
                    routerKey: `rk_${userData.user._id}`,
                    type: TypeOfMessage.CHAT_MESSAGE
                  } as IChatMessage
                  publishMessage(payload);
                  const contentElement = contentRef.current;
                  if (contentElement) {
                    (contentElement as any).scrollTop = 0
                  }
                  form.resetFields()
                  if (refInputMessage?.current) {
                    (refInputMessage.current as any)?.blur();
                    setTimeout(() => {
                      (refInputMessage.current as any)?.focus();
                    }, 100);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                    form.submit();
                  }
                }}>
                <Row justify="center" style={{ gap: "8px", marginTop: "16px" }}>
                  <Col span={10}>
                    <Form.Item name="content" required rules={[{ required: true, message: "Mensagem vazia" }]}>
                      <TextArea placeholder="Digite sua mensagem e pressione Enter para enviar (Shift + Enter para quebra de linha)" ref={refInputMessage} rows={3} style={{ height: "80px", resize: "none" }} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button icon={<SendOutlined />} htmlType="submit" style={{ height: "80px", width: "100%" }}>Enviar</Button>
                  </Col>
                </Row>
              </Form>
            </Footer>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
