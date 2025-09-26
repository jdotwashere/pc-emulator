import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SimFile } from '@/entities/SimFile';
import DraggableWindow from '../components/pc_emulator/DraggableWindow';

import { Folder, Code, StickyNote } from 'lucide-react';
import Notepad from '../components/pc_emulator/apps/Notepad';
import CodePad from '../components/pc_emulator/apps/CodePad';
import Explorer from '../components/pc_emulator/apps/Explorer';

const appRegistry = {
  Notepad: {
    title: 'Notepad',
    icon: <StickyNote className="w-8 h-8" />, ...