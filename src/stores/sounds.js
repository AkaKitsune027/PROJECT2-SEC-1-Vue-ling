import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSoundStore = defineStore('sound', () => {
  const bgmAudioSource = new Audio()
  const sfxAudioSource = new Audio()
  const isBgmPlaying = ref(false)

  bgmAudioSource.volume = 0.50
  sfxAudioSource.volume = 0.80

  function playSound(type, src) {
    if (type === 'bgm') {
      isBgmPlaying.value = true
      bgmAudioSource.src = src
      bgmAudioSource.loop = true
      bgmAudioSource.play()
    } else {
      sfxAudioSource.src = src
      sfxAudioSource.loop = false
      sfxAudioSource.play()
    }
  }

  function stopSound(type) {
    if (type === 'bgm') {
      bgmAudioSource.pause()
      bgmAudioSource.currentTime = 0
      isBgmPlaying.value = false
    } else {
      sfxAudioSource.pause()
      sfxAudioSource.currentTime = 0
    }
  }

  function toggleBgm() {
    if (isBgmPlaying.value) {
      bgmAudioSource.pause()
    } else {
      bgmAudioSource.play()
    }
    isBgmPlaying.value = !isBgmPlaying.value
  }

  return { playSound, stopSound, toggleBgm, isBgmPlaying }
})
