from deepface import DeepFace

image_path = 'trial/angry-boy.jpg.webp'


def detect_emotion(image_path):
    analysis = DeepFace.analyze(img_path=image_path, actions=['emotion'])
    return analysis[0]['dominant_emotion']


print(detect_emotion(image_path))
