import "./styles.css";
const audio = document.querySelector("audio");

$(function () {
  // Elements List
  var ballElement = $("#ball");
  var rod1Element = $("#rod1");
  var rod2Element = $("#rod2");
  var rodElement = $(".rod");
  // Doc Dimension Variables
  var docWidth = $(document).width();
  var docHeight = $(document).height() - 15;
  // Interval Variables
  var intervalId;
  var intervalTime = 10;
  // Location reset Variables
  var isStart = true;
  var halfPoint;
  if (docWidth % 2 === 0) {
    halfPoint = docWidth / 2;
  } else {
    halfPoint = (docWidth - 1) / 2;
  }
  // Current Score Variables
  var player_1_Score = 0;
  var player_2_Score = 0;
  // localStorage Variables Create
  var createLSV = () => {
    if (localStorage.getItem("gameScore") === undefined) {
      localStorage.setItem("gameScore", "0");
    }
    if (localStorage.getItem("gameWinPlayer") === undefined) {
      localStorage.setItem("gameWinPlayer", "0");
    }
  };
  var updateLSV = (winPayer) => {
    let gameMaxScore = Number(localStorage.getItem("gameScore"));
    let playerWon = Number(localStorage.getItem("gameWinPlayer"));
    if (winPayer === 1) {
      player_1_Score += 100;
      if (player_1_Score > gameMaxScore) {
        gameMaxScore = player_1_Score;
        localStorage.setItem("gameScore", String(gameMaxScore));
        localStorage.setItem("gameWinPlayer", String(winPayer));
      } else if (player_1_Score === gameMaxScore && winPayer !== playerWon) {
        localStorage.setItem("gameWinPlayer", "0");
      }
      alert(
        `Player ${winPayer} wins with a score of ${player_1_Score}. Max Score is ${gameMaxScore}`
      );
    } else {
      player_2_Score += 100;
      if (player_2_Score > gameMaxScore) {
        gameMaxScore = player_2_Score;
        localStorage.setItem("gameScore", String(gameMaxScore));
        localStorage.setItem("gameWinPlayer", String(winPayer));
      } else if (player_2_Score === gameMaxScore && winPayer !== playerWon) {
        localStorage.setItem("gameWinPlayer", "0");
      }
      alert(
        `Player ${winPayer} wins with a score of ${player_2_Score}. Max Score is ${gameMaxScore}`
      );
    }
  };
  var startingAlert = () => {
    let gameMaxScore = Number(localStorage.getItem("gameScore"));
    let playerWon = Number(localStorage.getItem("gameWinPlayer"));
    if (gameMaxScore === 0) {
      alert("This is your first time");
    } else {
      if (playerWon === 1) {
        alert(`Player 1 has the Max Score of ${gameMaxScore}`);
      } else if (playerWon === 2) {
        alert(`Player 2 has the Max Score of ${gameMaxScore}`);
      } else {
        alert(`Player 1&2 are tied with the Max Score of ${gameMaxScore}`);
      }
    }
  };
  var resetLSV = () => {
    localStorage.setItem("gameScore", "0");
    localStorage.setItem("gameWinPlayer", "0");
  };

  var positionReset = (isRod1) => {
    rod1Element.css({
      "margin-left": `${halfPoint - 50}px`,
      "margin-top": `0px`
    });
    rod2Element.css({
      "margin-left": `${halfPoint - 50}px`,
      "margin-top": `${docHeight - 5}px`
    });
    ballElement.css("margin-left", `${halfPoint + 10}px`);
    if (isRod1) {
      ballElement.css("margin-top", "15px");
    } else {
      ballElement.css("margin-top", `${docHeight - 20}px`);
    }
    isStart = true;
    audio.pause();
  };
  var getRightOffset = (el) => {
    return docWidth - (el.offset().left + el.width());
  };
  var getDownOffset = (el) => {
    return docHeight - (el.offset().top + el.height());
  };
  var isContact = () => {
    return (
      rodElement.offset().left <= ballElement.offset().left &&
      rodElement.offset().left + 130 >= ballElement.offset().left
    );
  };

  var moveUpLeft = () => {
    if (ballElement.offset().left <= 0 && ballElement.offset().top <= 15) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownRight, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    } else if (ballElement.offset().left <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveUpRight, intervalTime);
      return;
    } else if (ballElement.offset().top <= 15) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownLeft, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left - 1}px`,
      "margin-top": `${ballElement.offset().top - 1}px`
    });
  };
  var moveUpRight = () => {
    if (getRightOffset(ballElement) <= 0 && ballElement.offset().top <= 15) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownLeft, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    } else if (getRightOffset(ballElement) <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveUpLeft, intervalTime);
      return;
    } else if (ballElement.offset().top <= 15) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownRight, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left + 1}px`,
      "margin-top": `${ballElement.offset().top - 1}px`
    });
  };
  var moveDownLeft = () => {
    if (ballElement.offset().left <= 0 && getDownOffset(ballElement) <= 5) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpRight, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    } else if (ballElement.offset().left <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveDownRight, intervalTime);
      return;
    } else if (getDownOffset(ballElement) <= 5) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpLeft, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left - 1}px`,
      "margin-top": `${ballElement.offset().top + 1}px`
    });
  };
  var moveDownRight = () => {
    if (getRightOffset(ballElement) <= 0 && getDownOffset(ballElement) <= 5) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpLeft, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    } else if (getRightOffset(ballElement) <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveDownLeft, intervalTime);
      return;
    } else if (getDownOffset(ballElement) <= 5) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpRight, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left + 1}px`,
      "margin-top": `${ballElement.offset().top + 1}px`
    });
  };

  // Initial Set Position
  positionReset(true);
  createLSV();
  startingAlert();
  $(document).on("keypress", function (e) {
    if (e.which === 114) {
      clearInterval(intervalId);
      positionReset(true);
      resetLSV();
    }
    if (isStart) {
      if (e.which === 13) {
        audio.play();
        isStart = false;
        intervalId = setInterval(moveUpLeft, intervalTime);
      }
    } else {
      if (e.which === 100) {
        if (getRightOffset(rodElement) <= 10) {
          rodElement.css("margin-left", `${docWidth - 100}px`);
        } else {
          rodElement.css("margin-left", `${rodElement.offset().left + 10}px`);
        }
      } else if (e.which === 97) {
        if (rodElement.offset().left <= 15) {
          rodElement.css("margin-left", `0px`);
        } else {
          rodElement.css("margin-left", `${rodElement.offset().left - 10}px`);
        }
      }
    }
    audio.volume = 0.1;
  });
});
