#!/usr/bin/python3
import math

class HandControl:
    def __init__(self):
        self.tip_ids = [4, 8, 12, 16, 20]
        self.fingers = []

    def find_hands(self, img, results=None, flip_type=True):
        """
        Finds hands in a BGR image.
        img: Image to find the hands in.
        Image with or without drawings
        """
        all_hands = []
        h, w, c = img.shape
        for hand_type, hand_lms in zip(results.multi_handedness, results.multi_hand_landmarks):
            thumb_tip = hand_lms.landmark[4]
            pinky_tip = hand_lms.landmark[20]
            if thumb_tip.x < pinky_tip.x and hand_type.classification[0].label == "Left":
                palm_vector = 0
            elif thumb_tip.x > pinky_tip.x and hand_type.classification[0].label == "Right":
                palm_vector = 0
            else:
                palm_vector = 1
            my_hand = {}
            my_lm_list = []
            for lm in hand_lms.landmark:
                px, py, pz = int(lm.x * w), int(lm.y * h), int(lm.z * w)
                my_lm_list.append([px, py, pz])

            my_hand["lmList"] = my_lm_list
            my_hand["palm_vector"] = palm_vector

            if flip_type:
                if hand_type.classification[0].label == "Right":
                    my_hand["type"] = "Right"
                else:
                    my_hand["type"] = "Left"
            else:
                my_hand["type"] = hand_type.classification[0].label

            all_hands.append(my_hand)
        return all_hands

    def fingers_up(self, my_hand):
        """
        Finds how many fingers are open and returns in a list.
        Considers left and right hands separately
        :return: List of which fingers are up
        """
        my_hand_type = my_hand["type"]
        my_lm_list = my_hand["lmList"]
        fingers = []

        # Thumb
        if my_hand_type == "Left":
            if my_lm_list[self.tip_ids[0]][0] > my_lm_list[self.tip_ids[0] - 1][0]:
                fingers.append(1)
            else:
                fingers.append(0)
        else:
            if my_lm_list[self.tip_ids[0]][0] < my_lm_list[self.tip_ids[0] - 1][0]:
                fingers.append(1)
            else:
                fingers.append(0)

        for id in range(1, 5):
            if my_lm_list[self.tip_ids[id]][1] < my_lm_list[self.tip_ids[id] - 2][1]:
                fingers.append(1)
            else:
                fingers.append(0)
        return fingers

    def draw_line(self, image, point1, point2):
        cv2.line(image, (point1[0], point1[1]), (point2[0], point2[1]), (0, 255, 0), 3)

    def change_mode(self, image, result, currentmode, currenthand):
        hands = self.find_hands(image, result, flip_type=True)

        if len(hands) == 2:


            right_hand = None
            left_hand = None

            for hand in hands:
                hand_type = hand['type']
                if hand_type == "Right":
                    right_hand = hand
                elif hand_type == "Left":
                    left_hand = hand

            if not (right_hand and left_hand):
                return currentmode

            right_wrist = right_hand['lmList'][0]
            left_index_finger = left_hand['lmList'][8]
            # self.draw_line(image, right_wrist, left_index_finger)

            fingers_right = self.fingers_up(right_hand)
            if fingers_right == [1, 1, 1, 1, 1]:
                distance = math.sqrt((left_index_finger[0] - right_wrist[0]) ** 2 + (left_index_finger[1] - right_wrist[1]) ** 2)
                if distance < 10:
                        return "Number"
                
            if fingers_right == [0, 0, 0, 0, 0]:
                distance = math.sqrt((left_index_finger[0] - right_wrist[0]) ** 2 + (left_index_finger[1] - right_wrist[1]) ** 2)
                if distance < 10:
                        return "Letter"
            
            if fingers_right == [0, 1, 1, 0, 0]:
                distance = math.sqrt((left_index_finger[0] - right_wrist[0]) ** 2 + (left_index_finger[1] - right_wrist[1]) ** 2)
                if distance < 10:
                        return "Word"             

            return currentmode
        if len(hands) == 1:
            
            hand_to_use = None

            for hand in hands:
                hand_type = hand['type']
                if currenthand == "Right" and hand_type == "Left":
                    hand_to_use = hand
                elif currenthand == "Left" and hand_type == "Right":
                    hand_to_use = hand

            if not (hand_to_use):
                return currentmode

            fingers_right = self.fingers_up(hand_to_use)
            if fingers_right == [0, 0, 0, 0, 0]:
                return "Borrar"
            
            if fingers_right == [1, 1, 1, 1, 1]:
                return " "

            return currentmode


    
    def change_mode2(self, image, result, currentmode, current_hand):
        hands = self.find_hands(image, result, flip_type=True)

        if len(hands) != 1:
            return currentmode
        
        hand_to_use = None

        for hand in hands:
            hand_type = hand['type']
            if current_hand == "Right" and hand_type == "Left":
                hand_to_use = hand
            elif current_hand == "Left" and hand_type == "Right":
                hand_to_use = hand

        if not (hand_to_use):
            return currentmode

        fingers_right = self.fingers_up(hand_to_use)
        if fingers_right == [1, 0, 0, 0, 1]:
            return "Next"

        return currentmode

    def count_fingers(self, image, result):
        hands = self.find_hands(image, result, flip_type=True)

        fingers_count = 0

        for hand in hands:
            palm_vector = hand['palm_vector']
            if palm_vector > 0:
                fingers = self.fingers_up(hand)
                if fingers in [[0, 1, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1]]:
                    fingers_count += fingers.count(1)
        return fingers_count
