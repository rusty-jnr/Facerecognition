import React, { useState, useEffect } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


//INPUT CLARIFAI API KEY
const app = new Clarifai.App({
  // apiKey: '7e34t534532325efdqwefweger34'
});

const particleOptions = {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

const App = () => {

  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [box , setBox] = useState([]);
  const [route, setRoute] = useState('signin');
  const [signedIn, setSignedIn] = useState(false);
  const [count, setCount] = useState(0)
  const [user, setUser] = useState([{
    id: '1',
    name: 'Charly',
    email: 'n@gmail.com',
    entries: 0,
    joined: new Date()
  }]);

  useEffect(() => {
    setUser(user.map(user => {
      if(user.id){
        user.entries = count;
      }else {
        console.log("Not possible");
      }
      return user;
    }))
  }, [count])

  const handleText = (e) => {
    setText(e.target.value);
  }


  const calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const mainBox = clarifaiFace.map(boxb => {
      return {
        toprow: boxb.region_info.bounding_box.top_row * height,
        leftcol: boxb.region_info.bounding_box.left_col * width,
        bottomrow: height - (boxb.region_info.bounding_box.bottom_row * height),
        rightcol: width - (boxb.region_info.bounding_box.right_col * width)
      }
    })

    setBox(mainBox);
  }

  const onSubmitImage = () => {
      setImage(text);
      app.models.predict(Clarifai.FACE_DETECT_MODEL, text)
      .then(response => {
        if(response){
          setUser(user.map(user => {
            if(user.id){
              setCount(count + 1);
            }else {
              console.log("Not possible");
            }

            return user;
          }))
        }
        calculateFaceLocation(response)
      })
      .catch(err => console.log(err))
  }

  const onRouteChange = (mainRoute) => {
    if(mainRoute === 'signout'){
      setSignedIn(false)
    }else if (mainRoute === 'home') {
      setSignedIn(true)
    }
    setRoute(mainRoute);
  }

  return (
    <div className="App">
      <Particles className='particles' params={particleOptions} />
      <Navigation isSignedIn={signedIn} onRouteChange={onRouteChange}/>
      
      { route === 'home'
        ?
        <div>
          <Logo />
          {
            user.map((user, i) => (
              <Rank user={user} index={i} />
            ))
          }
          <ImageLinkForm handleText={handleText}  onSubmitImage={onSubmitImage}/>
          <FaceRecognition box={box} imageUrl={image}/>
        </div>
        : (
          route === 'signin'
          ? <Signin onRouteChange={onRouteChange}/>
          : <Register onRouteChange={onRouteChange}/>
          )
      }
      
    </div>
  );
}

export default App;
