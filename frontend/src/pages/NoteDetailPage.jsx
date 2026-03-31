import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderCircle, TrashIcon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in Fetching Notes");
        toast.error("Failed to fetch the Notes!!")
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);
  const handleDelete = () => { };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderCircle className='animate-spin size-10' />
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back To Home
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <TrashIcon className='h-5 w-5' />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className='form-control mb-4'>
                <label className='label'>
                 <span className='label-span'>Title</span>
                </label>
                <input
                type='text'
                placeholder='Note Title'
                className='input input-bordered'
                value={note.title}
                onChange={(e) => setNote({...note, title:e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                 <span className='label-span'>Content</span>
                </label>
                <textarea
                placeholder='Write your Note here...'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e) => setNote({...note, content:e.target.value})}
                />
              </div>
              <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving}></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage
