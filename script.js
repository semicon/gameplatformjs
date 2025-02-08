const player = {
    x: 50,
    y: 500,
    width: 50,
    height: 100,
    speed: 5,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    sprite: {
        Idle: [],
        RunRight: [],
        RunLeft: [],
        Jump: [],
        Dead: []
    },
    currentSprite: [],
    frameIndex: 0
};

function loadSprite(spriteType, count) {
    for (let i = 1; i <= count; i++) {
        const img = new Image();
        img.src = '/img/'+spriteType+'('+i+').png';
        player.sprite[spriteType].push(img);
    }
}

// โหลด sprite ทั้งหมด
loadSprite('Idle', 10);
loadSprite('Run', 8);
loadSprite('Jump', 10);
loadSprite('Dead', 10);

// สำหรับการวิ่งไปทางซ้าย ใช้ sprite เดียวกับวิ่งไปทางขวาและสลับทิศทาง
player.sprite.RunLeft = player.sprite.RunRight.map(img => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.translate(img.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
});


function drawPlayer() {
    const sprite = player.currentSprite[player.frameIndex];
    if (typeof sprite === 'string') {
        const img = new Image();
        img.src = sprite;
        ctx.drawImage(img, player.x, player.y, player.width, player.height);
    } else {
        ctx.drawImage(sprite, player.x, player.y, player.width, player.height);
    }
}


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
        player.velocityX = player.speed;
        player.currentSprite = player.sprite.RunRight;
    } else if (e.code === 'ArrowLeft') {
        player.velocityX = -player.speed;
        player.currentSprite = player.sprite.RunLeft;
    } else if (e.code === 'ArrowUp' && !player.Jump) {
        player.velocityY = -10;
        player.jumping = true;
        player.currentSprite = player.sprite.Jump;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        player.velocityX = 0;
        player.currentSprite = player.sprite.Idle;
    }
});
