import { useEffect, useState } from 'react';

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const breaks = text.split('\n');
    let newLines = "";
    for (let i = 0; i < breaks.length; i ++) {
        newLines = newLines + breaks[i] + ' breakLine ';
    }

    const words = newLines.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        if (words[n] != 'breakLine'){
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        } else {
            context.fillText(line, x, y);
            line = '';
            y += lineHeight;
        }
    }
    context.fillText(line, x, y);
}

export default function Home() {
    const [title, setTitle] = useState('Title Goes Here');
    const [artwork, setArtwork] = useState('/default.jpg');

    const handleDrawCanvas = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.src = artwork;

        image.addEventListener('load', () => {
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(0, 0, 1000, 1000);
            ctx.drawImage(image, 40, 40, 600, 600);
            ctx.font = '500 60px Arial';
            ctx.fillStyle = '#000',
            ctx.textAlign = 'left',
            // ctx.fillText(title, 40, 780);
            wrapText(ctx, title, 40, 780, 940, 60)
        });
    }

    const handleImageChange = (e) => {
        e.preventDefault();

        const target = e.currentTarget;

        const curFiles = target.files;
        const validFileType = true; // Do a proper check for this
        if (curFiles.length > 0) {
            for (const file of curFiles) {
                if (validFileType) {
                    const src = URL.createObjectURL(file);

                    setArtwork(src);
                }
                else {
                    console.warn('Invalid file type');
                }
            }
        }
    }

    const handleTitleChange = (e) => {
        e.preventDefault();

        const target = e.currentTarget;
        const value = target.value;

        setTitle(value);
    }

    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            width: 1010
        },
        canvasWrap: {
            width: 500,
            height: 500
        },
        canvas: {
            maxWidth: '100%',
            maxHeight: '100%'
        },
        fake: {
            background: '#e0e0e0',
            width: 500,
            height: 500,
            position: 'relative'
        },
        preview: {
            width: 300,
            height: 300,
            position: 'absolute',
            top: 20,
            left: 20
        },
        image: {
            width: '100%',
            height: '100%'
        },
        input: {
            width: 'calc(100% - 40px)',
            position: 'absolute',
            top: 360,
            left: 20,
            background: 'none',
            border: 0,
            fontSize: '30px',
            lineHeight: 1,
            fontFamily: 'Arial'
        }
    }

    console.log(artwork);

    return (
        <div>
            <p>Canvas Playground</p>
            <div style={styles.grid}>
                <div style={styles.canvasWrap}>
                    <canvas
                        id="canvas"
                        width={1000}
                        height={1000}
                        style={styles.canvas}
                    />
                </div>
                <div style={styles.fake}>
                    <span style={styles.preview}>
                        {artwork &&
                            <img src={artwork} style={styles.image} />
                        }
                    </span>
                    <textarea
                        name="title"
                        defaultValue={title}
                        style={styles.input}
                        onChange={handleTitleChange}
                    />
                </div>
            </div>
            <button onClick={handleDrawCanvas}>Draw</button>
            <input type="file" name="image" onChange={handleImageChange} />
        </div>
    );
}
