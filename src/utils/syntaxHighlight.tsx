import React from 'react';

interface HighlightProps {
  code: string;
}

const TOKEN_REGEX = /(\/\/[^\n]*)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(^\s*#\w+.*)|(\b(?:typedef|struct|enum|union|const|static|void|int|float|double|char|unsigned|signed|long|short|bool|return|if|else|switch|case|default|break|continue|for|while|do|sizeof|class|public|private|protected|virtual|override|namespace|using|new|delete|template|typename|nullptr|true|false)\b)|(\b(?:printf|scanf|fopen|fclose|fread|fwrite|fprintf|fscanf|malloc|calloc|realloc|free|exit|strlen|strcpy|strcmp|strncpy|NULL|FILE|size_t|std|vector|string|cout|cin|endl)\b)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*(?=\s*\())/g;

export const highlightLine = (line: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(line.slice(lastIndex, match.index));
    }

    const [full, comment, str, preproc, keyword, stdFunc, num, funcCall] = match;

    if (comment) {
      elements.push(
        <span key={match.index} style={{ color: '#64748b', fontStyle: 'italic' }}>
          {comment}
        </span>
      );
    } else if (str) {
      elements.push(
        <span key={match.index} style={{ color: '#34d399' }}>
          {str}
        </span>
      );
    } else if (preproc) {
      elements.push(
        <span key={match.index} style={{ color: '#38bdf8', fontWeight: 600 }}>
          {preproc}
        </span>
      );
    } else if (keyword) {
      elements.push(
        <span key={match.index} style={{ color: '#60a5fa', fontWeight: 600 }}>
          {keyword}
        </span>
      );
    } else if (stdFunc) {
      elements.push(
        <span key={match.index} style={{ color: '#93c5fd' }}>
          {stdFunc}
        </span>
      );
    } else if (num) {
      elements.push(
        <span key={match.index} style={{ color: '#f59e0b' }}>
          {num}
        </span>
      );
    } else if (funcCall) {
      elements.push(
        <span key={match.index} style={{ color: '#a5b4fc' }}>
          {funcCall}
        </span>
      );
    } else {
      elements.push(full);
    }

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < line.length) {
    elements.push(line.slice(lastIndex));
  }

  return elements.length > 0 ? elements : [line || ' '];
};
