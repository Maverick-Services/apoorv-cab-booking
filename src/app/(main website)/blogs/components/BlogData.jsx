import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './post.module.css';
import CategoryCard from './CategoryCard';
import Image from 'next/image';

function BlogData({ post }) {
    return (
        <section className="flex flex-col gap-5 pb-5 px-5 md:px-8 max-w-[1000px]">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className='w-full relative h-full'>
                {post.imageURL?.imageURL && (
                    <Image
                        className="h-full max-h-[500px] object-cover rounded-lg"
                        src={post.imageURL.imageURL}
                        alt={post.title || 'Post Image'}
                        height={1000}
                        width={1000}
                    />
                )}
                <div className='absolute bottom-3 right-3'>
                    <CategoryCard categoryId={post.categoryId} />
                </div>
            </div>
            <div className={styles.postStyle}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
            </div>
        </section>
    );
}

export default BlogData;
