import { useEffect, useState } from 'react';
import { Button } from './Button';

import { api } from '../services/api';

interface SideBarProps {
  isSelectedGenreId: number;
  onClickButton: (id:number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({onClickButton, isSelectedGenreId}:SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClickButton(genre.id)}
            selected={isSelectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
