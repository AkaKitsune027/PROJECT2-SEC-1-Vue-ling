<template>
  <div class="menu flex flex-col items-center min-h-screen bg-[#fcfbfb]">
    <div class="w-screen h-20 flex justify-end py-4 px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M212.92 17.69a8 8 0 0 0-6.86-1.45l-128 32A8 8 0 0 0 72 56v110.08A36 36 0 1 0 88 196V62.25l112-28v99.83A36 36 0 1 0 216 164V24a8 8 0 0 0-3.08-6.31"
        />
      </svg>
    </div>
    <!-- Title -->
    <h1
      class="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#ffffff]"
    >
      ISEKAI COOKING
    </h1>

    <!-- Left Section: Buttons and Right Section: Restaurant Info -->
    <div
      class="flex flex-col justify-center md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 w-4/5"
    >
      <!-- Buttons Section -->
      <div class="flex flex-col justify-center space-y-4 w-full md:w-auto">
        <button class="btn-play h-14">PLAY</button>
        <button class="btn-how text-nowrap h-14">HOW TO PLAY</button>
      </div>

      <!-- Restaurant Info Section -->
      <div
        class="bg-[#ffffff] p-8 rounded-lg justify-center shadow-2xl flex flex-col items-center w-full md:w-5/12 h-96"
      >
        <img
          src="/Home.svg"
          alt="Restaurant"
          class="w-24 h-24 object-cover"
        />
        <p class="text-center font-bold text-lg text-[#2d2d2d]">USERNAME</p>
        <p class="text-[#2d2d2d] text-lg mt-4">YOUR RESTAURANT</p>
        <label
          class="bg-[#96ab97] w-full h-16 text-center py-4 text-white rounded-md text-lg"
          >MASTER OF GOBLIN</label
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  font-family: "SUNDAY";
  background-image: linear-gradient(10deg, #e1bbb8 0%, #5a7d6b 100%);
}

.btn-play {
  background-color: #61544b;
  color: white;
  padding: 10px 5vw;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.btn-how {
  background-color: #61544b;
  color: white;
  padding: 10px 5vw;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

h1 {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
</style>
