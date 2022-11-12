import React from 'react';

import Babble from './Babble';
import FormMessage from './FormMessage';
import Header from './Header';

// import MessageForm from './MessageForm';

const data = {
    "messages": [
        {
            "messageId": "926fc5b6-58e8-4fd9-8e3b-4c80af3d13b2",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100501,
            "recipient": 100500,
            "dialogId": 1,
            "timestamp": 1668251123440
        },
        {
            "messageId": "1075ba6c-0285-4d3b-8c93-e1a8a9d38b2a",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100501,
            "recipient": 100500,
            "dialogId": 1,
            "timestamp": 1668250908735
        },
        {
            "messageId": "ed050cae-2b4f-4bd3-b96b-084df9084708",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668249832128
        },
        {
            "messageId": "c6721de6-0e5e-4d50-aae8-d52996e3a4ec",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668210110022
        },
        {
            "messageId": "aa4721b8-4658-4604-95ea-95ff7f5aed4c",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668196481210
        },
        {
            "messageId": "60c18d5c-da8d-435b-857a-b42633d27ee1",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668191616137
        },
        {
            "messageId": "705f49a1-043b-4ab2-aa59-d64bf6d69618",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668191590907
        },
        {
            "messageId": "0353bd69-c17b-46a4-995f-d8d7641dd847",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668187631345
        },
        {
            "messageId": "5a957722-cf44-4315-9b0c-9ff8aaad4dde",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668183544761
        },
        {
            "messageId": "5c2121de-a236-49be-be78-f318791d252b",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668183535972
        },
        {
            "messageId": "acfd1dfa-bea3-42ad-a20d-73cd1747aac5",
            "text": "Привет всем участникам Hack & Change!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668171772012
        },
        {
            "messageId": "e6d73ee9-013c-454b-89d2-6f0cd4019497",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668171754167
        },
        {
            "messageId": "b0735b3e-4a63-4136-99c8-28fa9230e1ba",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668171747159
        },
        {
            "messageId": "bf07be71-3d1c-42a3-9ade-eb7407ab1bf0",
            "text": "Привет всем участникам Hack & Change!",
            "data": "{\"widget\":\"custom data\"}",
            "messageType": "WIDGET",
            "mediaUrl": "https://cdn-icons-png.flaticon.com/512/945/945244.png",
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668168695928
        },
        {
            "messageId": "25314f81-78a5-45b6-a81e-377d2f9989ee",
            "text": "Привет, оператор!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668162853140
        },
        {
            "messageId": "233458db-dd00-436d-a4df-85fb4959c1ed",
            "text": "Привет, оператор!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668162813875
        },
        {
            "messageId": "c3231836-ef7a-411f-bd99-fa4cb54dfa0c",
            "text": "Привет, оператор!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668162617494
        },
        {
            "messageId": "bebdf364-1fe8-4cbd-b95f-35e92b1852ae",
            "text": "Сколько у меня доступных средств?",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668155585037
        },
        {
            "messageId": "2a0da872-f8a8-4316-bb23-02a1161ea84d",
            "text": "Привет, оператор!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668153997208
        },
        {
            "messageId": "73b5eb8b-bb7f-41e0-8b06-2638c8c09e50",
            "text": "Привет, оператор!",
            "data": null,
            "messageType": "TEXT",
            "mediaUrl": null,
            "sender": 100500,
            "recipient": 100501,
            "dialogId": 1,
            "timestamp": 1668153956319
        }
    ]
}



export default function Chat() {
    const role = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem('jwtToken');
    let dialogId = -1;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function GetName(token, id_message) {
        if (userId == id_message) {
            if (role == "OPERATOR") {
                return "Оператор";
            } else {
                return "Пользователь";
            }
        } else {
            if (role == "OPERATOR") {
                return "Пользователь";
            } else {
                return "Оператор";
            }
        }
    }

    var result = [];

  // onSendMessage = async () => {
  //   const api_url = "";
  //   const data = await api_url.json();
  //   console.log(data);
  // }

    for (let index = data.messages.length - 1; index >= 0; index--) {
        result.push(Babble(data.messages[index],
            userId == data.messages[index].sender,
            GetName(userId, data.messages[index].sender)));
    }
    return (
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-12">
                    <div>
                        <Header />
                        {result}
                        <FormMessage />
                    </div>
                </div>
            </div>
        </div>
    );
}
