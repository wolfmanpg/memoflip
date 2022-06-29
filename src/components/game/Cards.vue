<template>
  <div :class="{
        'container': true,
        'mx-auto': true,
        'mb-4': true,
        'w-1/3': level === 1 || level === 2,
        'w-2/5': level === 3
      }">
    <ul>
      <div :class="cardsClassObject">
        <li v-for="card in levelCards" :key="card.id">
          <div class="card w-28 h-36" @click="flipCard(card)">
            <div :class="{ card__content: true, flip: card.shouldApplyFlip }">
              <div class="card_face card__front text-7xl">
                <h5>?</h5>
              </div>
              <div
                :class="{
                  card_face: true,
                  card__back: true,
                  'text-4xl': true,
                  card_found: card.matchFound,
                }"
              >
                <h1>{{ card.cardValue }}</h1>
              </div>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    cardsPerRow: {
      type: Number,
      required: false,
      default: 4,
    },
    totalCards: {
      type: Number,
      required: true,
      default: 16,
    }
  },
  setup(props, { emit }) {

    const cardsClassObject = computed(() => {
      return {
        'cards' : true,
        'grid' : true,

        'grid-cols-4' : props.level === 1,
        'grid-cols-5' : props.level === 2,
        'grid-cols-6' : props.level === 3,

       'gap-x-4' : true,
       'gap-y-7' : true,
      }
    });

    const applyFlip = ref(false);
    const levelCards = ref([]);

    //about cards/game status
    const previousFlippedCard = ref(null);
    const currentFlippedCard = ref(null);
    const numberOfFlippedCards = ref(0);

    const disableChecks = ref(false);
    const tries = ref(0);

    const clickShouldBeDisabled = (card) => {
      return disableChecks.value || card.matchFound === true;
    };

    //generate a random card value
    const generateCardValue = () => {
      let min = 1;
      let max = props.totalCards / 2 + 1;

      let numberFound = false,
        number,
        timesNumberExist;

      while (!numberFound) {
        number = Math.floor(Math.random() * (max - min) + min);

        //check if number does not yet exists 2 times
        timesNumberExist = levelCards.value.filter(
          (card) => card.cardValue === number
        ).length;

        //if number hasn't been added yet, or only once, then number is found
        if (timesNumberExist < 2) {
          numberFound = true;
        }
      }

      return number;
    };

    //initialize card levels
    const initlevelCards = () => {
      for (let i = 0; i < props.totalCards; i++) {
        let el = {
          id: i,
          shouldApplyFlip: false,
          cardValue: generateCardValue(),
          matchFound: false,
        };

        levelCards.value.push(el);
      }
    };

    initlevelCards();

    const checkIfLevelIsFinished = () => {
      const totalMatchesFound = levelCards.value.filter(
        (card) => card.matchFound
      ).length;

      //check if all the cards has their match found 
      if (totalMatchesFound === props.totalCards) {
        let levelScore = Math.round( (props.totalCards / tries.value) * 100);
        emit("levelFinished", levelScore);
      }
    };

    //returning
    return {
      cardsClassObject,
      applyFlip,
      levelCards,
      currentFlippedCard,
      previousFlippedCard,
      numberOfFlippedCards,
      disableChecks,
      clickShouldBeDisabled,
      checkIfLevelIsFinished,
      tries,

      flipCard(card) {
        if (clickShouldBeDisabled(card)) {
          return;
        }

        currentFlippedCard.value = levelCards.value.find(
          (el) => el.id === card.id
        );

        //check if a match was alreday found for this card, in this case do not proceed further
        if (currentFlippedCard.value.matchFound) {
          return;
        }

        currentFlippedCard.value.shouldApplyFlip = true;
        numberOfFlippedCards.value++;
        tries.value++;

        //if there is no previous value there isn't anything to check , return
        if (previousFlippedCard.value === null) {
          previousFlippedCard.value = currentFlippedCard.value;
          return;
        }

        //maybe here disable flipping for other cards
        disableChecks.value = true;

        let areValuesMatched = currentFlippedCard.value.cardValue === previousFlippedCard.value.cardValue;

        setTimeout(() => {
          //check if previous value matches with the current one
          if (! areValuesMatched && numberOfFlippedCards.value === 2) {
            //match was not found
            currentFlippedCard.value.shouldApplyFlip = false;
            previousFlippedCard.value.shouldApplyFlip = false;
          } else {
            //match was found
            currentFlippedCard.value.matchFound = true;
            previousFlippedCard.value.matchFound = true;
          }

          if (numberOfFlippedCards.value === 2) {
            previousFlippedCard.value = null;
            numberOfFlippedCards.value = 0;
          }

          disableChecks.value = false;

          //check if level is finished 
          setTimeout(() => {
            checkIfLevelIsFinished();
          }, 600);

        }, 850);
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  perspective: 1000px;
  background-color: transparent;
}

.card__content {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 1s;
  transform-style: preserve-3d;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
}

.flip {
  transform: rotateY(-180deg);
}

.card_face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}

.card__front:hover{
    border: 4.5px white solid;
}

.card__front {
  background-color: #611309;
}

.card__back {
  background-color: rgb(226, 195, 158);
  color: black;
  transform: rotateY(180deg);
}

.card_found {
  background-color: green !important;
  color: white;
  transition: all 0.25s;
}
</style>
