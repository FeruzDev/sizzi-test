import React, {useEffect, useState} from 'react';
import {Stage, Layer, rect, Rect, Text, Transformer} from 'react-konva';
import {createStore} from "effector";
import {useStore} from "effector-react";
const KonvaExample = (props) => {
    const [item, setItem] = useState(3)
    const [select, setSelect] = useState([])
    const [isShift, setIsShift] = useState(false);
    const [isCtrl, setIsCtrl] = useState(false);

    const $count = createStore(
        [...Array(item)].map((_, i) => ({
            id: i.toString(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 180,
            isDragging: false,
            selected: false,
        }))
    )


    const count = useStore($count)

    const INITIAL_STATE = count


    const [rects, setrects] = useState([]);


    const handleDragrectt = (e) => {

        const id = e.target.id();
        setrects(
            rects.map((rect) => {
                return {
                    ...rect,
                    isDragging: rect.id === id
                };
            })
        );
    };
    const handleDragEnd = (e) => {
        const id = e.target.id();

        setrects(
            rects.map((rect) => {
                return {
                    ...rect,
                    isDragging: rect.id === id,
                };
            })
        );
        if (e.key === 'enter') {
        }
    };

    useEffect(() => {
        setrects(INITIAL_STATE)
    }, [item, select.selected])

    window.addEventListener('keydown', e => {

        if (e.key == "Enter") {
            setItem(item + 1)
        }
        if (e.keyCode == 16) {
            setIsShift(true);
        }

        if (e.keyCode == 17){
            setIsCtrl(true);
        }
    });

    window.addEventListener('keyup', e => {

        if (e.keyCode == 16) {
            setIsShift(false);
        }
        if (e.keyCode == 17){
            setIsCtrl(false);
        }
        if (isCtrl){
            if (e.keyCode == 66){
                select.map(item => {
                    setrects(rects.concat({...rects[item], x: rects[item].x + 60, y: rects[item].y + 60, id: rects.length}));
                })
            }
        }
    });

    const add = (data) => {
        setItem(item + 1)
    }

    const sel = (rect, index) => {

        if (isShift) {
            if (select.includes(index)) {
                setSelect(select.filter((itm) => itm !== index));
            } else {
                setSelect(select.concat(index))
            }
        } else {
            setSelect([index]);
        }
    }

    return (
        <>
            <div className="counter-btn">
                <button onClick={() => add()}>+</button>
                <button onClick={() => setItem(item - 1)}>-</button>
            </div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text="Попробуй перетащить звезду"/>
                    {rects?.map((rect, index) => (
                        <>
                            <Rect
                                key={rect.id}
                                id={rect.id}
                                x={rect.x}
                                y={rect.y}
                                onClick={(e) => {
                                    sel(rect, index)
                                }}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={40}
                                fill={select.filter(item2 => item2 === index).length > 0 ? "red" : "black"}
                                opacity={0.8}
                                rotation={rect.rotation}
                                shadowColor="black"
                                shadowBlur={10}
                                shadowOpacity={0.6}
                                shadowOffsetX={rect.isDragging ? 10 : 5}
                                shadowOffsetY={rect.isDragging ? 10 : 5}
                                scaleX={rect.isDragging ? 1.2 : 1}
                                scaleY={rect.isDragging ? 1.2 : 1}
                                width={60}
                                height={60}
                            />
                        </>
                    ))}
                </Layer>
            </Stage></>
    );
};


export default KonvaExample;