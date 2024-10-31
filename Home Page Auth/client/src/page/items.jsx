import React from "react";
import "../styles/HomeItems.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

const fruits = [
  {
    title: "Apple",
    image:
      "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/home/apple",
  },
  {
    title: "Banana",
    image:
      "https://images.unsplash.com/photo-1520658289427-977eb66c2dbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D",
    path: "/home/banana",
  },
  {
    title: "Orange",
    image:
      "https://plus.unsplash.com/premium_photo-1670512181061-e24282f7ee78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T3JhbmdlfGVufDB8fDB8fHww",
    path: "/home/orange",
  },
  {
    title: "Strawberry",
    image:
      "https://media.istockphoto.com/id/157643364/photo/tumble-of-strawberries.webp?a=1&b=1&s=612x612&w=0&k=20&c=N4VCluieyCYUe7QSXeTiEqs4zfczQMsfm4x-OUWyQzs=",
    path: "/home/strawberry",
  },
  {
    title: "Grapes",
    image:
      "https://plus.unsplash.com/premium_photo-1692813664205-d567a6829a10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JhcGVzfGVufDB8fDB8fHww",
    path: "/home/grapes",
  },
  {
    title: "Pineapple",
    image:
      "https://media.istockphoto.com/id/172862474/photo/pineapple-a-ripe-fresh-fruit-food-whole-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=CVTmu52AYhz2kbPGIgu4OPnglnyDuglagPh5KlVQ6rU=",
    path: "/home/pineapple",
  },
  {
    title: "Watermelon",
    image:
      "https://plus.unsplash.com/premium_photo-1724256227267-cfe917bc1d9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2F0ZXJtZWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    path: "/home/watermelon",
  },
  {
    title: "Mango",
    image:
      "https://media.istockphoto.com/id/985162774/photo/bunch-of-indian-mangoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=IKmcqdr2IQravCOv9-z7lSohZw09kUCB2yur4rBOhqA=",
    path: "/home/mango",
  },
  {
    title: "Peach",
    image:
      "https://images.unsplash.com/photo-1565769583321-29e69b493031?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGVhY2h8ZW58MHx8MHx8fDA%3D",
    path: "/home/peach",
  },
  {
    title: "Kiwi",
    image:
      "https://plus.unsplash.com/premium_photo-1674382739482-5d36b98d653a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2l3aXxlbnwwfHwwfHx8MA%3D%3D",
    path: "/home/kiwi",
  },
];

export default function HomeItems(isVerified) {
  const navigate = useNavigate();

  function handleClickMe(path) {
    console.log(path);
    if (isVerified) {
      navigate(path);
    } else {
      navigate("/auth/login", { state: { from: path } });
    }
  }

  // const loginGoogle = useGoogleOneTapLogin({
  //   onSuccess: (credentialResponse) => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });

  return (
    <div className="grid-container">
      {fruits.map((fruit, index) => (
        <div className="card" key={index}>
          <img src={fruit.image} alt={fruit.title} className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{fruit.title}</h3>
            <button
              className="card-button"
              onClick={() => handleClickMe(fruit.path)}
            >
              Click Me
            </button>
          </div>
        </div>
      ))}
      <div style={{}}>
        {/* <GoogleLogin
        theme="outline"
        size="large"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
          auto_select
        /> */}
      </div>
    </div>
  );
}
