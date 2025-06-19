const foods = [
    '沙县小吃', '遵义羊肉粉', '牛肉粿条', '福鼎肉片', '小龙虾', '翘脚牛肉',
    '海南鸡饭', '老乡鸡', '真功夫', '窑鸡王', '贵州小串', '干蒸菜',
    '老娘舅', '吉祥馄饨', '兰州拉面'
];

const colors = [
    '#FFB300', '#FF7043', '#66BB6A', '#29B6F6', '#AB47BC', '#EC407A',
    '#FFA726', '#8D6E63', '#26A69A', '#D4E157', '#FF8A65', '#BA68C8',
    '#90A4AE', '#FFD600', '#43A047'
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');
const resultDiv = null; // 不再使用结果区域
const size = canvas.width;
const center = size / 2;
const radius = center - 10;
const segCount = foods.length;
const anglePerSeg = 2 * Math.PI / segCount;
let startAngle = -anglePerSeg / 2;
let isSpinning = false;
let currentAngle = 0;

function drawWheel() {
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < segCount; i++) {
        const angle = startAngle + i * anglePerSeg;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, angle, angle + anglePerSeg);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angle + anglePerSeg / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '20px Microsoft YaHei';
        ctx.fillText(foods[i], radius - 10, 10);
        ctx.restore();
    }
}

function drawWheelWithPointer(angle) {
    ctx.clearRect(0, 0, size, size);
    // 旋转并绘制转盘
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle);
    ctx.translate(-center, -center);
    drawWheel();
    ctx.restore();
    // 不再绘制canvas指针
}

drawWheelWithPointer(0);

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    let duration = 2500 + Math.random() * 500; // 2.5-3秒
    let start = null;
    let totalAngle = Math.PI * 4 + Math.random() * 2 * Math.PI; // 4圈多一点
    function animate(ts) {
        if (!start) start = ts;
        let elapsed = ts - start;
        let progress = Math.min(elapsed / duration, 1);
        currentAngle = totalAngle * easeOutQuart(progress);
        drawWheelWithPointer(currentAngle);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            // showResult(); // 不再显示结果
        }
    }
    requestAnimationFrame(animate);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

spinBtn.addEventListener('click', spin); 