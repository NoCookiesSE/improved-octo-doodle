//Меню 

let mainMenuTriger = document.querySelector('.menu-triger')
let mainMenuContainer = document.querySelector('.main-menu-container')

mainMenuTriger.addEventListener('click', function(){
	mainMenuContainer.classList.toggle('main-menu-opened')
})

//Мокапи фотографій
let allComments = ['Цей кадр нереально крутий! :)',
				'Ти вмієш дивувати! Кожен кадр - поєднання життєлюбності і краси',
				'Спинися мить, прекрасна ти!',
				'Просто супер! Як тобі це вдається?',
				'Це прото шедевр мистецтва',
				'В цьому штучному світі так приємно знайти щось натуральне))',
				'Клас!!!))',
				'Нереально чудово!',
				'А ти вмієш дивувати ;)',
				'Це фото так і проситься в рамочку на стіну']
let allDescriptions = ['Коли радості немає меж',
						'Любов в кожному пікселі',
						'Фото заряджене позитивом',
						'Зловив дзен',
						'Як мало потрібно для щастя',
						'Знали б ви що в мене на умі! ;)',
						'Show must go on',
						'Good vibes only',
						'My inspiration',
						'On my way to paradise',
						'Що це, якщо не любов? Х)'
						]
						
function generateRandomElement(array){
	return array[Math.floor(Math.random() * (array.length - 1))]
}

function generatePicturesDB(number){
	let pictures = []
	for(let i  = 0; i < number; i++){
		let comments = []
		for(let j = 0; j < Math.floor(Math.random() * 10); j++){
			comments.push(generateRandomElement(allComments))
		}
		let pictureExample = {
			src: `../static/img/photos/${i}.jpg`,
			likes: Math.floor(Math.random() * 200),
			effect: 'none',
			description: generateRandomElement(allDescriptions),
			comments: comments,
			commentsNumber: comments.length
		}
		pictures.push(pictureExample)
	}
	return pictures
}

let picturesDB = generatePicturesDB(25)


// Завантаження зображень на сайт
function showPictures(photosArray){
	let picturesTemplate = document.querySelector('#templatePictureExample')
	let pictureExample = picturesTemplate.content.querySelector('.pictureExample')
	let picturesContainer = document.querySelector('.picturesContainer')
	for(let i  = 0; i < photosArray.length; i++){
		let photoBlock = pictureExample.cloneNode(true)
		photoBlock.querySelector('.pictureImg').src = photosArray[i].src
		photoBlock.querySelector('.pictureImg').style.filter = photosArray[i].effect
		photoBlock.querySelector('.pictureComments').innerText = photosArray[i].commentsNumber
		photoBlock.querySelector('.pictureStars').innerText = photosArray[i].likes
		picturesContainer.append(photoBlock)
	}
}

showPictures(picturesDB)

// Відкрити зображення
function showCheckedPicture(picture){	
	let openedPictureContainer = document.querySelector('.openedPictureContainer')	
	openedPictureContainer.querySelector('.openedPictureImg').src = picture.src
	openedPictureContainer.querySelector('.openedPictureImg').style.filter = picture.effect
	openedPictureContainer.querySelector('.descriptionText').innerText = picture.description
	openedPictureContainer.querySelector('.pictureComments').innerText = picture.commentsNumber
	openedPictureContainer.querySelector('.pictureStars').innerText = picture.likes
	let commentsContainer = document.querySelector('.pictureCommentsContainer')	
	let commentTemplate =  document.querySelector('#commentTemplate').content.querySelector('.commentBlock')
	for(let i = 0; i < picture.comments.length; i++){
		let comment = commentTemplate.cloneNode(true)
		comment.querySelector('.commentText').innerText = picture.comments[i]
		commentsContainer.append(comment)
	}
	openedPictureContainer.classList.remove('hidden')
}

//showCheckedPicture(picturesDB[3])

let picturesContainer = document.querySelector('.picturesContainer')
picturesContainer.addEventListener('click', function(evt){
	
	let checkedElement = evt.target
	console.log(evt)
	if(checkedElement.classList.contains('pictureImg')){
		console.log(checkedElement.getAttribute('src'))
		for(let i = 0; i < picturesDB.length; i++){
			if(picturesDB[i].src === checkedElement.getAttribute('src')){
				showCheckedPicture(picturesDB[i])
				break
			}
		}
	}
	
})

let  closedButton = document.querySelector('.closeButton')
closedButton.addEventListener('click', function(){
	document.querySelector('.openedPictureContainer').classList.add('hidden')
	commentsContainer.innerHTML = ""
})

//Форма завантаження зображення
let inputUploadFile = document.querySelector('#inputUploadFile')
inputUploadFile.addEventListener('change', function(){
	if(inputUploadFile.files[0] && inputUploadFile.files[0].type.includes('image')){
		let reader = new FileReader();
		reader.readAsDataURL(inputUploadFile.files[0]);
		reader.addEventListener('load', function(){
			let uploadImage = document.querySelector('.uploadImage')
			uploadImage.src = reader.result
			
			let labelsEffectSettings = document.querySelectorAll('.uploadEffectPreview')
			for(let i = 0; i < labelsEffectSettings.length; i++){
				labelsEffectSettings[i].style.backgroundImage = `url(${reader.result})`
			}
			let settingsContainer = document.querySelector('.uploadImageOverlay')
			settingsContainer.classList.remove('hidden')
		})		
	} else {
		alert("Select an image file!")
	}
});


let buttonCloseUpload = document.querySelector('#uploadCancel')
buttonCloseUpload.addEventListener('click', function(){
    document.querySelector('.uploadImageOverlay').classList.add('hidden')
})

let uploadEffectFieldset = document.querySelector('.uploadEffectFieldset')
uploadEffectFieldset.addEventListener('change', function(evt){
	document.querySelector('.inputActive').classList.remove('inputActive')
	document.querySelector(`[for="${evt.target.id}"]`).classList.add('inputActive')	
	
	setEffectLevel(evt.target.value)
})


// Слайдер інтенсивності ефектів
function setEffectLevel(effect){
let line = document.querySelector(".effectLevelLine")
let pin = document.querySelector(".effectLevelPin")
let progressLine = document.querySelector(".effectLevelProgressLine")
let inputEffectLevel = document.querySelector("#effectLevel")
let uploadImage = document.querySelector('.uploadImage')

pin.style.left = 0
progressLine.style.width = 0
uploadImage.style.filter = 'none'


pin.addEventListener("mousedown", function(evt){
	evt.preventDefault()

	document.addEventListener("mousemove", onMouseMove)
	document.addEventListener("mouseup", onMouseUp)

	function onMouseMove(evt){
		if (effect === 'none') {
pin.style.left = 0
progressLine.style.width = 0
uploadImage.style.filter = 'none'
		} else {
			let newLeft = evt.clientX - line.getBoundingClientRect().left
		if (newLeft < 0) {
			newLeft = 0
		}
		if (newLeft > line.offsetWidth) {
			newLeft = line.offsetWidth
		}

		pin.style.left = newLeft + 'px'
		progressLine.style.width = newLeft + 'px'

		inputEffectLevel.value = Math.floor(newLeft / line.offsetWidth * 100)
       
		console.log(inputEffectLevel.value)

		uploadImage.style.filter = `${effect}(${inputEffectLevel.value}%)`
		}





	}
	function onMouseUp(){
		document.removeEventListener("mousemove", onMouseMove)
		document.removeEventListener("mouseup", onMouseUp)
	}
})

}

function changeStatusSubmiButton(active){
	let submitButton = document.querySelector('#uploadSubmit')
}

if (active){
	submitButton.classList.add("active")
	submitButton.disabled = true
	console.log("button able")
}
else {
	submitButton.classList.remove("active")
	submitButton.disabled = false
	console.log("button disabled")
}

let inputHashtags = document.querySelector(".uploadFormHashtags")

inputHashtags.addEventListener("change", function () {
	let errorMessage =  document.querySelector(".uploadFormErrorMessage");

	if (inputHashtags.value.includes("#")) {
		let hashtagsArray = inputHashtags.value.split(" ");

		changeStatusSubmitButton(true)
		errorMessage.innerText = ""
	}
	else {
		changeStatusSubmiButton(false)
		errorMessage.innerText = "All Hastags have to start with #"
	}

});









